import React from 'react';
import axios from 'axios';
import * as THREE from 'three';

import imgLogoMain from '../assets/images/logo.png';
import imgLogoFypon from '../assets/images/modal/logo-fypon.svg';
import imgLogoLarson from '../assets/images/modal/logo-larson.png';
import imgLogoTherma from '../assets/images/modal/logo-therma.jpg';

import {ReactComponent as SvgClose} from '../assets/images/close.svg';
import { baseUrl } from '../data/config';
import { SetTween, GetToolBtnRowArr, GetObjModalSize, GetZoom } from '../data/model';
import { toolsSectionArr } from '../data/modalData';

export default class ToolComponent extends React.Component {
	constructor(props) {
		super(props);
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		const wHeight = props.device?window.innerHeight-55:window.innerHeight;
		const zoom = GetZoom();
		const outSize = GetObjModalSize(window.innerWidth, wHeight, [], props.device, zoom);
		const {pageKey, userInfo, wishlists, toolModal, toolInner, openToolId, wSize} = props;
		this.cWidth = this.props.wSize.width;
		this.cHeight = this.props.wSize.height;
		this.state = {pageKey, userInfo, wishlists, toolModal, toolInner, openToolId, wSize, outSize};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['pageKey', 'userInfo', 'wishlists', 'toolModal', 'toolInner', 'openToolId', 'wSize'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				if (key==='openToolId') {this.callAnalyticsAPI(this.state.openToolId, nextProps.openToolId)}
				this.setState({[key]:nextProps[key]}, () => {
					const {openToolId} = this.state;
					if (key==='openToolId') {
						if (!nextProps.openToolId) {
							['mainInfo', 'subInfo', 'selObject'].forEach(key => {
								this.setState({[key]:false});
							});
						}
						const sectionInfo = toolsSectionArr.find(section=>section.id===openToolId);
						if (!sectionInfo) return;
						const {name, data} = sectionInfo;
						const buttonArr = GetToolBtnRowArr(data, openToolId === 35 ? 2: 3);
						this.setState({mainInfo:{buttonArr, title:name, apiId:openToolId} })
					}
				});
			}
		});
	}

	callAnalyticsAPI = (oldId, newId) => {
		const toolId = oldId || newId, is_entered = newId?1:0;
		const sectionInfo = toolsSectionArr.find(section=>section.id===toolId);
		const {userInfo} = this.state, {name} = sectionInfo;
		const reqData = {user_id:userInfo.id, mainSection:'Welcome', page:name, section_id:name, type:'section', is_entered, device_type:this.props.apiDevice};
		axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {  });
	}

	callAPI = (apiId) => {
		const {userInfo} = this.state;
		if (!userInfo) return;
		// const reqData = {user_id: userInfo.id, mainSection: 7, area_id: 1, parent: apiId};
		this.props.setOpenToolId(apiId);
	}

	onClickSubButton = (item) => {
		const selObject = item.content?item.content[0]:item;
		this.props.openObject({title:selObject.name, data:[selObject], toolId:this.state.mainInfo.apiId});
	}

	onClickMainButton = (item) => {
		const {mainInfo} = this.state, mainId = mainInfo.apiId;
		if (item.type === 'array') {
			this.setState({subInfo:{title:item.name, buttonArr:GetToolBtnRowArr(item.data, mainId===35?2:3)}})
		} else if (item.type==='url') {
			window.open(item.url, '_blank');
		} else {
			this.props.openObject({title:item.name, data:[item], toolId:mainId});
		}
	}

	closeTV = () => {
		const key = this.state.subInfo?'subInfo':'mainInfo';
		setTimeout(() => {
			this.setState({[key]:false}, ()=>{
				if (key==='mainInfo') {
					this.props.setOpenToolId(null);
				}
			});
		}, 200);
	}

	openLogoSite = (logoStr) => {
		var urlStr, {userInfo} = this.state, apiStr = '';
		if (logoStr==='therma') {urlStr = 'https://2023virtualexperience.thermatru.com/?email='+userInfo.email; apiStr = 'THERMATRU LINK';} // thermatru2023dev.thetunagroup.com tt2023demo
		else if (logoStr==='fypon') {urlStr = 'https://2023virtualexperience.thermatru.com/?email='+userInfo.email; apiStr = 'FYPON LINK';}
		else if (logoStr==='larson') {urlStr = 'https://landing.larsondoors.com/VirtualIBS'; apiStr = 'LARSON LINK';}
		const newTab = window.open(urlStr, '_blank');
		newTab.focus();
		const reqData = {user_id:userInfo.id, mainSection:'Welcome', section_id:'PR & Media', page:logoStr, is_entered:0, type:'redirect', device_type:this.props.apiDevice};
		axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {});
	}

	render() {
		const {mainInfo, subInfo, tHeight, toolModal, toolInner, outSize} = this.state;
		return (
			<div className={`tool-modal modal-back ${toolModal?'active':''}`}>
				<div className={`modal-wrapper ${toolInner?'active':''}`} style={{width:(outSize.w+60)+'px', height:(outSize.h+60)+'px'}}>
					<div className='tool-wrapper'>
						{!mainInfo &&
							<div className='tv-page section-part'>
								{toolsSectionArr.map(item=>
									<div className='section-item' onClick={()=>this.callAPI(item.id)} key={item.id}>
										<img className='section-img' src={item.img}></img>
									</div>
								)}
								<div className='close-icon flex' onClick={this.props.closeTool}>
									<SvgClose></SvgClose>
								</div>
							</div>
						}
						{mainInfo &&
							<div className={`tv-page scroll scroll-y ${mainInfo.apiId === 35?'split':''}`}>
								<div className='button-content'>
									<div className='main-logo'><img src={imgLogoMain}></img></div>
									<div className='title'>{mainInfo.title}
										<label className='sub-title'> {subInfo?` (${subInfo.title})`:''}</label>
									</div>
									{!subInfo && mainInfo.buttonArr.map((rowItem, rowIdx )=>
										<div className={`row-item flex row-length-${mainInfo.buttonArr.length}`} key={rowIdx}>
											{rowItem.map((item, idx )=>
												<div className={`button ${item.id===299?'full-width':''}`} key={idx} onClick={()=>this.onClickMainButton(item)}>
													{item.name}
												</div>
											)}
										</div>
									) }
									{subInfo && subInfo.buttonArr.map((rowItem, rowIdx )=>
										<div className={`row-item flex row-length-${subInfo.buttonArr.length}`} key={rowIdx}>
											{rowItem.map((item, idx )=>
												<div className={`button`} key={idx} onClick={()=>this.onClickSubButton(item)}>
													{item.name}
												</div>
											)}
										</div>
									) }
									{mainInfo.apiId === 35 &&
										<div className='row-contact'>
											<div className='contact-label mobile-hide'>Please contact Anna Palagi for media inquiries or to request a guided media tour.</div>
											<div className='contact-info'>apalagi@ampagency.com / 402.850.9820</div>
										</div>
									}
									{mainInfo.apiId === 39 &&
										<div className='row-contact flex'>
											<div className='contact-label'>For more information, visit</div>
											<div className='contact-info contact-url' onClick={() => {
												window.open('http://fiberondecking.com/', '_blank');
											}}> fiberondecking.com</div>
										</div>
									}
								</div>
								{mainInfo.apiId === 35 &&
									<div className='logo-content'>
										<div className='logo-label'>Discover More From Our Other Brands</div>
										<div className='logo-item' onClick={()=>this.openLogoSite('therma')}><img src={imgLogoTherma} style={{height:tHeight*0.1+'px'}}></img></div>
										<div className='logo-item' onClick={()=>this.openLogoSite('fypon')}><img src={imgLogoFypon} style={{height:tHeight*0.08+'px'}}></img></div>
										<div className='logo-item' onClick={()=>this.openLogoSite('larson')}><img src={imgLogoLarson} style={{height:tHeight*0.12+'px'}}></img></div>
									</div>
								}
								<div className='close-icon flex' onClick={this.closeTV}>
									<SvgClose></SvgClose>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
