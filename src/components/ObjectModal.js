import React from 'react';

import ToolModalComponent from './ToolModal';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';
import { GetRowInfo, GetObjModalSize } from '../data/model';
import {ReactComponent as SvgHeart} from '../assets/images/home/heart.svg';
import {ReactComponent as SvgDown} from '../assets/images/modal/download.svg';
import videoPre from '../assets/video/pre-video.mp4';
import { GetDevice, DownloadFile, GetZoom } from '../data/model';
import { baseUrl } from '../data/config';
import { modelArr } from '../data/constant';
import axios from 'axios';

export default class ObjectModalComponent extends React.Component {
	constructor(props) {
		super(props);
		const wHeight = props.device?window.innerHeight-55:window.innerHeight;
		const zoom = GetZoom();
		const outSize = GetObjModalSize(window.innerWidth, wHeight, [], this.props.device, zoom);
		this.state = {selObject:props.selObject, objectInner:props.objectInner, userInfo:props.userInfo, title:'', rowArr:[], selNum: 0, wishlists:props.wishlists, outSize, zoom};
	}

	componentDidMount() {
	}

	callSectionAPI = () => {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.selObject !== nextProps.selObject) {
			var rowArr = [], title, rowCount = 4, selItem, selImgUrl, rowVisible;
			if (nextProps.selObject) {
				title = nextProps.selObject.title;
				this.dataArr = nextProps.selObject.data;
				selItem = this.dataArr[0];
				if (nextProps.selObject.rowCount) rowCount = nextProps.selObject.rowCount;
				rowArr = GetRowInfo(this.dataArr, rowCount);
				selImgUrl = nextProps.selObject.selImgUrl;
				rowVisible = this.dataArr.length > 1;
				if (rowVisible) this.callAnalyticsAPI(nextProps.selObject, 1);
			} else {
				if (this.state.rowVisible) this.callAnalyticsAPI(this.state.selObject, 0);
			}
			const pageWrapper = document.querySelector('.page-wrapper');
			const pHeight = pageWrapper.offsetHeight;
			const zoom = GetZoom();
			const outSize = GetObjModalSize(window.innerWidth, pHeight, rowArr, this.props.device, zoom);
			this.setState({selObject:nextProps.selObject, rowArr, selNum:0, selItem, title, selImgUrl, rowVisible, outSize, zoom}, () => {
				this.setHeartClass();
			});
		}
		['firstVideo', 'objectInner', 'userInfo', 'selScene', 'wishlists'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, () => {
					if (key==='wishlists') { this.setHeartClass(); }
				});
			}
		});
	}

	callAnalyticsAPI = (selObject, is_entered) => {
		if (!selObject) return;
		const {userInfo, selScene} = this.state, {title} = selObject;
		const modelInfo = modelArr.find(item=>item.key===selScene);
		const reqData = {user_id:userInfo.id, mainSection:modelInfo.apiKey, page:title, section_id:title, type:'section', is_entered, device_type:this.props.apiDevice};
		axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {  });
	}

	setHeartClass = () => {
		const {wishlists, selObject} = this.state;
		if (!selObject) return;
		const checkWishlist = wishlists.find(item=>parseInt(item.section_id)===parseInt(selObject.hotId));
		this.setState({heartClass:checkWishlist?'heart':''});
	}

	onClickButton = (selNum) => {
		const selItem = this.dataArr[selNum], {selScene, userInfo, selObject} = this.state;
		if (selItem.type==='favorite') {
			this.props.changeWishlist(selObject.hotId);
		} else if (selItem.type==='url') {
			window.open(selItem.url, "_blank");
			const modelInfo = modelArr.find(item=>item.key===selScene);
			// const reqData = {user_id:userInfo.id, section_id:modelInfo.apiId, mainSection:5, page:selItem.name};
			const reqData = {user_id:userInfo.id, mainSection:modelInfo.apiKey, section_id:selObject.title, page:'Sample', type:'redirect', is_entered:0, device_type:this.props.apiDevice};
			axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {});
		} else if (selItem.type==='download') {
			// DownloadFile('./modalData/'+selObject.title+'/'+selItem.fileName);
			DownloadFile(selItem.downloadUrl);
		} else {
			this.setState({selNum, selItem});
		}
	}

	render() {
		const {selObject, objectInner, rowArr, title, selImgUrl, selItem, rowVisible, heartClass, wishlists, firstVideo, outSize, zoom, selNum, userInfo, selScene} = this.state;
		const rowH = this.props.device?42:55, deltaH = this.props.device?40:60;
		var height = outSize.h+deltaH+rowH*(rowVisible?rowArr.length:0);
		// if (firstVideo) height += 20;
		if (selObject && selObject.hotId==='100') height += 45;
		return (
			<div className={`object-modal modal-back ${(selObject)?'active':''} ${title==='Welcome'?'welcome-modal':''}`}>
				<div className={`modal-wrapper ${objectInner?'active':''}`} style={{width:(outSize.w+60)+'px', height:height+'px'}}>
					{/* , transform:`scale(${100/(zoom - 10)})` */}
					{selObject &&
						<>
							<div className='modal-title' style={{transform:`scale(${100/(zoom - 10)})`}}>{title}</div>
							<div className='content'>
								{selItem &&
									<ToolModalComponent
										device={this.props.device}
										apiDevice={this.props.apiDevice}
										userInfo={userInfo}
										selScene={selScene}
										modalTitle={title}
										toolId={selObject.toolId}
										wishlists={wishlists}
										modalType='object'
										contentH={outSize.h}
										selObject={selItem}
										objectInner={objectInner}
										setObjType={this.props.setObjType}
										zoom={zoom}
									></ToolModalComponent>
								}
								{selImgUrl &&
									<img className='single-img' src={selImgUrl}></img>
								}
							</div>
							{selObject && selObject.bottomLabel && selItem &&
								<div className='bottom-label' style={{transform:`scale(${100/(zoom - 10)})`}}>{selItem.bottomLabel}</div>
							}
							{rowVisible &&
								<div className='object-rows' style={{transform:`scale(0.9)`}}>
									{/* ${100/(zoom - 10)} */}
									{rowArr.map((rowItem, rowIdx) =>
										<div className={`object-row ${rowItem.length<4?'wide':''} ${selObject.hotId==='100'?'expand':''} flex`} key={rowIdx}>
											{rowItem.map((item, idx) =>
												<div
													className={`object-button
														${item.btnImg?'img-button':'button'}
														${(item.name==='Favorite')?heartClass:''}
														${selNum===item.oriIdx?'active':''}`}
													onClick={()=>this.onClickButton(item.oriIdx)} key={idx}>
													{item.type==='favorite'&&<SvgHeart></SvgHeart>}
													{item.name==='Download'&&<SvgDown></SvgDown>}
													{item.btnImg!==undefined&&<img src={item.btnImg} alt=''></img>}
													{item.name==='Fiberon EDGEX / EDGEXMETAL'&&<label >Fiberon EDGEX <span> / </span> EDGEXMETAL</label>}
													{(item.type!=='favorite'&&item.name!=='Download'&&item.btnImg===undefined&&item.name!=='Fiberon EDGEX / EDGEXMETAL')&&item.name}
												</div>
											) }
										</div>
									) }
								</div>
							}
							{/* {firstVideo && <div className='object-rows'>Watch how Fiberon is partnering with Magnolia Network, coming Spring 2023.</div> } */}
						</>
					}
					<div className='close-icon flex' style={{transform:`scale(${100/(zoom - 10)})`}} onClick={()=>{
						this.props.closeObjectModal('objectInner')
						setTimeout(() => {
							this.props.closeObjectModal('selObject');
							if (firstVideo) this.props.closeObjectModal('firstVideo');
						}, 500);
					}}><SvgClose></SvgClose></div>
				</div>
			</div>
		);
	}
}
