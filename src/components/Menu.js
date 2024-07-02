import React from 'react';
import axios from 'axios';

import {ReactComponent as SvgHome} from '../assets/images/menu/left-home.svg';
import {ReactComponent as SvgInfo} from '../assets/images/menu/left-info.svg';
import {ReactComponent as SvgSpeak} from '../assets/images/menu/left-speak.svg';
import {ReactComponent as SvgHide} from '../assets/images/menu/right-hide.svg';
import {ReactComponent as SvgReset} from '../assets/images/menu/right-reset.svg';
import {ReactComponent as SvgMoon} from '../assets/images/menu/right-moon.svg';
import {ReactComponent as SvgSun} from '../assets/images/menu/right-sun.svg';
import {ReactComponent as SvgMic} from '../assets/images/menu/right-mic.svg';
import {ReactComponent as SvgCollapse} from '../assets/images/menu/collapse.svg';
import imgReset from '../assets/images/menu/right-reset.png';
import imgHide from '../assets/images/menu/right-hide.png';

import { mainMenuArr, subMenuArr, colorDeckArr } from '../data/menuInfo';
import { GetRowInfo } from '../data/model';
import { baseUrl } from '../data/config';
import { modelArr } from '../data/constant';

const conDeckKey = 'conMainDeck', goodDeckKey = 'goodMainDeck';
const concordiaDeckInfo = [ {key:'conSubDeckSymmetry', label:'Symmetry'}, {key:'conSubDeckHorizon', label:'Horizon'}, {key:'conSubDeckAstir', label:'Astir'}]
const conDeckStick = {key:conDeckKey, stickInfo:concordiaDeckInfo, middle:true, label:'Decking'}
const goodlifeDeckInfo = [ {key:'goodSubDeckEscapes', label:'Escapes'}, {key:'goodSubDeckWeekender', label:'Weekender'}]
const goodDeckStick = {key:goodDeckKey, stickInfo:goodlifeDeckInfo, middle:true, label:'Decking'}

export default class MenuComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey, userInfo, selScene, speaker, lightMode, menuVisible, selVoice, scenePos, selProduct, menuColArrStr} = props;
		this.state = {pageKey, userInfo, expand:false, menuKey:'main', expandEnd:false, selScene, speaker, lightMode, menuVisible, selVoice, scenePos, colInfo:{}, selProduct, menuColArrStr};
		this.menuColArr = JSON.parse(menuColArrStr);
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.props.skipTest) this.onClickMenuItem({key:'explore'});
		}, 1000);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['selHotspot', 'pageKey', 'userInfo', 'selScene', 'scenePos', 'speaker', 'lightMode', 'menuVisible', 'infoModal', 'selVoice', 'selProduct', 'toolModal', 'menuColArrStr'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, () => {
					if (key==='pageKey') {
						const expand = nextProps.pageKey !== 'welcome' ? true : false;
						this.setExpand(expand);
					} else if (key==='selScene') {
						if (this.state.selProduct) this.onClickMenuItem({key:'explore'});
						this.setColInfo();
					} else if (key==='scenePos') {
						const {menuKey, stickItem} = this.state;
						if (menuKey==='deck') this.setStickDeckInfo(stickItem);
					} else if (key==='menuColArrStr') {
						this.menuColArr = JSON.parse(this.state.menuColArrStr);
						this.setColInfo();
					}
				});
			}
		});
	}

	setColInfo = () => {
		const colInfo = this.menuColArr.find(item=>item.key===this.state.selScene);
		this.setState({colInfo});
	}

	setExpand = (expand) => {
		this.setState({expand}, () => {
			if (expand) setTimeout(() => { this.setState({expandEnd:true}) }, 600);
			else this.setState({expandEnd:false})
		});
	}

	setStickDeckInfo = (oldStickItem) => {
		var {selScene, scenePos} = this.state;
		if (selScene==='promenade' && scenePos===1) selScene = 'paramount';
		else if (oldStickItem.key.includes('SubDeck')) selScene = oldStickItem.key;
		// else if (oldStickItem.key.includes('goodlifeDeck')) selScene = oldStickItem.key;
		const colInfo = colorDeckArr.find(item=>item.key===selScene);
		const stickItem = {...oldStickItem, stickInfo:colInfo.colArr};
		const stickBlog = Math.ceil(colInfo.colArr.length/2);
		this.setState({menuKey:'deck', stickItem, stickBlog});
	}

	setToolPart = (toolId) => {
		const {selScene, scenePos, toolModal} = this.state; var delayTime = 0;
		if (toolModal) return;
		if (selScene!=='balance') {delayTime = 1000;}
		else if (scenePos!==1) {delayTime = 500;}
		if (delayTime) this.props.callPage('canvas', 'balance', 1);
		// this.setState({selMenuKey:'tool'});
		setTimeout(() => { this.props.openToolModal() }, delayTime);
		if (toolId) setTimeout(() => { this.props.setOpenToolId(toolId) }, delayTime + 500);
	}

	onClickMenuItem = (stickItem) => {
		const itemKey = stickItem.key;
		// const stickItem = subMenuArr.find(menuItem=>menuItem.stickInfo && menuItem.key===itemKey);
		if (stickItem.sceneArr) { this.callAnalyticsAPI(stickItem, 1); }
		else if (this.apiType) {this.callAnalyticsAPI(stickItem, 0);}
		if (itemKey === 'media') { this.onClickMenuItem({key:'explore'}); setTimeout(() => { this.setToolPart(35); }, 100); }
		else if (itemKey === 'info') this.props.openInfoModal();
		else if (itemKey === 'guide') this.props.openGuideModal(); // this.props.callPage('guide');
		else if (itemKey === 'tool') this.setToolPart();
		else if (itemKey === 'balance') {this.props.callPage('canvas', 'balance'); this.setState({selMenuKey:'balance'})}
		else if (itemKey === 'explore') {this.setState({menuKey: itemKey, stickItem:undefined, selMenuKey:itemKey});}
		else if	(stickItem.stickInfo) {
			const stickBlog = Math.ceil(stickItem.stickInfo.length/2), {selScene} = this.state;
			if (itemKey === 'deck') {
				if (selScene !== 'concordia' && selScene !== 'goodlife') this.setStickDeckInfo(stickItem);
				else {
					if 		(selScene === 'concordia') this.setState({menuKey:conDeckKey, stickItem:{...conDeckStick, img:stickItem.img}, stickBlog:3});
					else if (selScene === 'goodlife') this.setState({menuKey:goodDeckKey, stickItem:{...goodDeckStick, img:stickItem.img}, stickBlog:2});
				}
			} else this.setState({menuKey:itemKey, stickItem, stickBlog});
		}
		if (itemKey==='explore' || itemKey==='balance') this.props.setOpenToolId(null);
	}

	callAnalyticsAPI = (stickItem, is_entered) => {
		const {selScene, userInfo} = this.state;
		if (is_entered === 1) { this.apiType = stickItem.label; }
		const modelInfo = modelArr.find(item=>item.key===selScene);
		const reqData = {user_id:userInfo.id, mainSection:modelInfo.apiKey, section_id:this.apiType, page:this.apiType, type:'color_change', is_entered, device_type:this.props.apiDevice};
		axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {  });
		if (is_entered === 0) { this.apiType = null; }
	}

	onClickStickItem = (stickItem, subItem) => {
		if (stickItem.key==='product') {
			if (subItem.sceneKey) {
				this.props.callPage('canvas', subItem.sceneKey, subItem.scenePos);
				setTimeout(() => { this.onClickMenuItem({key:'explore'}); }, 100);
			} else {
				var {title, arr} = subItem.modalInfo, rowArr = GetRowInfo(arr, 2);
				this.props.openProductModal({title, rowArr});
			}
		} else if (stickItem.key==='experience') {
			this.props.callPage('canvas', subItem.key);
			setTimeout(() => { this.onClickMenuItem({key:'explore'}); }, 100);
		} else if (stickItem.key==='deck' || stickItem.key==='rail' || stickItem.key==='furniture' || stickItem.key.includes('SubDeck')) { // concordia
			const colPart = stickItem.key.includes('Deck')?'deck': stickItem.key;
			this.props.setModelColor(colPart, subItem);
		} else if (stickItem.key.includes('MainDeck')) {
			this.setStickDeckInfo({...subItem, img:stickItem.img});
		}
		this.setState({selMenuKey:stickItem.key});
	}
	onClickHome = () => {
		if (this.apiType) {this.callAnalyticsAPI(stickItem, 0);}
		this.setState({menuKey:'main', stickItem:null})//  explore
		this.props.callPage('canvas', 'balance');
	}
	getSubMenuArr = () => {
		const {selScene, selMenuKey} = this.state;
		var selMenuArr = [];
		subMenuArr.forEach(item => {
			if (item.sceneArr) {
				if (selScene === 'home') return;
				else if (selMenuKey === 'tool' && item.sceneArr) return;
				else if (item.sceneArr.indexOf(selScene)===-1) return; 
			}
			selMenuArr.push(item);
		});
		return selMenuArr;
	}

	getColClassStr = (stickItem, subItem) => {
		const {colInfo, selScene, scenePos} = this.state;
		if (stickItem.key === 'experience') {
			var classStr = '';
			if (selScene==='balance') {
				if 		(scenePos !== 2 && subItem.key==='balance') classStr = 'active';
				else if (scenePos === 2 && subItem.key==='cladding') classStr = 'active';
			} else if (subItem.key===selScene) classStr = 'active';
			return classStr;
		}
		if (!['deck', 'rail', 'furniture'].includes(stickItem.key) && !stickItem.key.includes('SubDeck')) return '';
		var colorKey = stickItem.key;
		if (selScene==='promenade' && stickItem.key==='deck') colorKey = scenePos===0?'promenade':'paramount';
		else if (stickItem.key.includes('SubDeck')) colorKey = 'deck';
		if (!colInfo) return;
		const colorValue = colInfo[colorKey];
		if (!colorValue) return;
		if (typeof colorValue === 'string') {
			return colorValue===subItem.hexVal?'active':'';
		} else {
			const colHexVal = colorValue.toString(16);
			return subItem.color.toLowerCase()==='#'+colHexVal.toLowerCase()?'active':'';
		}
	}

	getStickArr = (stickItem) => {
		const {selScene} = this.state, {stickInfo, key} = stickItem;
		if (key==='rail') {
			if (selScene==='sanctuary' || selScene==='promenade') return stickInfo;
			else return stickInfo.filter(item=>{return item.key!=='mix'});
		} else return stickInfo;
	}

	render() {
		const {pageKey, menuKey, expand, expandEnd, lightMode, stickItem, stickBlog, selScene, speaker, menuVisible, selMenuKey, infoModal, selVoice, toolModal} = this.state;
		return (
			<div className={`menu flex ${menuKey} ${expand?'expand':''} ${menuVisible?'':'hidden'}`}>
				<div className='menu-wrapper flex' onMouseEnter={() =>this.props.setMenuOver(true)} onMouseLeave={() => this.props.setMenuOver(false)}>
					{pageKey !== 'welcome' &&
						<div className={`menu-collapse flex ${expand?'hide':''}`} onClick={()=>this.setExpand(true)}>
							<SvgCollapse></SvgCollapse>
						</div>
					}
					<div className='menu-left menu-part'>
						{menuKey==='main'?<div className='icon-wrapper info-wrapper' onClick={this.props.openInfoModal}><SvgInfo></SvgInfo></div>:
							<div className='icon-wrapper home-wrapper' onClick={this.onClickHome}><SvgHome></SvgHome></div>
						}
						<div className={`icon-wrapper speaker-wrapper ${speaker?'':'mute'}`} onClick={this.props.setSpeaker}><SvgSpeak></SvgSpeak></div>
					</div>
					<div className='menu-middle menu-part'>
						{menuKey==='main' && mainMenuArr.map((item, idx) =>
							<div className={`menu-item flex ${item.key==='tool'?'wide':''}`} key={idx} onClick={()=>this.onClickMenuItem(item)}>
								{item.tooltip && expandEnd &&
									<div className='tooltip-wrapper'>
										<div className='tooltip-inner'>{item.tooltip}</div>
										<div className='tooltip-arrow'></div>
									</div>
								}
								<div className='icon-wrapper'><img src={item.img}></img></div>
								<div className='menu-label'>{item.label}</div>
							</div>
						) }
						{menuKey==='explore' && this.getSubMenuArr().map((item, idx) =>
							<div className={`menu-item flex ${item.key}
								${item.key===selScene?'active':''}
								${item.key==='tool'&&toolModal?'active':''}
								${item.key==='tool'?'wide':''}
								${(item.key==='info' && infoModal)?'active':''}`}
								key={idx} onClick={()=>this.onClickMenuItem(item)}>
								{/* ${item.key===selMenuKey?'active':''}  */}
								{item.tooltip && expandEnd &&
									<div className='tooltip-wrapper'>
										<div className='tooltip-inner'>{item.tooltip}</div>
										<div className='tooltip-arrow'></div>
									</div>
								}
								<div className='icon-wrapper'><img src={item.img}></img></div>
								<div className='menu-label'>{item.label}</div>
							</div>
						) }
						{stickItem &&
							<>
								<div className='stick-part'>
									<div className='back-label' onClick={()=>{
										if (stickItem.key.includes('SubDeck')) {
											if 		(stickItem.key.includes('conSubDeck')) this.setState({menuKey:conDeckKey, stickItem:{...conDeckStick, img:stickItem.img}, stickBlog:3});
											else if (stickItem.key.includes('goodSubDeck')) this.setState({menuKey:goodDeckKey, stickItem:{...goodDeckStick, img:stickItem.img}, stickBlog:2});
										} else this.onClickMenuItem({key:'explore'})
									}}>
										<div className='back-icon'></div>
										<label>Back</label>
									</div>
									<div className={`menu-item flex`}>
										<div className='icon-wrapper'><img src={stickItem.img}></img></div>
										<div className='menu-label'>{stickItem.label}</div>
									</div>
								</div>
								<div className={`stick-wrapper ${stickItem.key}`} style={{width:stickBlog*(stickItem.key==='furniture'?130:230)+'px', minWidth:2*230+'px'}}>
									{this.getStickArr(stickItem).map((subItem, stickIdx) =>
										<div className='stick-item-wrapper flex' key={stickIdx}>
											<div className={`stick-item ${this.getColClassStr(stickItem, subItem)}`} key={stickIdx} onClick={()=>this.onClickStickItem(stickItem, subItem)}>
												{subItem.color && 
													<div className={`color-wrapper ${subItem.key}`} style={{backgroundColor:subItem.color}}></div>
												}
												<div className='stick-label'>
													<label>{subItem.label}</label>
													{subItem.subLabel !== undefined && <label>{subItem.subLabel}</label>} 
												</div>
											</div>
										</div>
									) }
								</div>
							</>
						}
					</div>
					{menuKey !== 'main' && selMenuKey !== 'tool' &&
						<div className='menu-right menu-part'>
							<div className='small-icons'>
								<div className='menu-item flex' onClick={()=>this.setExpand(false)}>
									<div className='icon-wrapper'>
										<img src={imgHide} alt=''></img>
										{/* <SvgHide></SvgHide> */}
									</div>
									<div className='menu-label'>Hide&nbsp;&nbsp;</div>
								</div>
								{(selScene==='promenade' || selScene==='sanctuary' || selScene==='concordia' || selScene==='goodlife') &&
									<div className='menu-item flex' onClick={this.props.setResetColor}>
										<div className='icon-wrapper'>
											<img src={imgReset} alt=''></img>
											{/* <SvgReset></SvgReset> */}
										</div>
										<div className='menu-label'>Reset</div>
									</div>
								}
							</div>
							{(selScene === 'promenade') &&
								<div className='big-icon'>
									<div className='menu-item' onClick={this.props.setLightMode}>
										<div className={`icon-wrapper ${lightMode?'night':'day'}`}>
											{lightMode?<SvgSun></SvgSun>:<SvgMoon></SvgMoon>}
										</div>
									</div>
									<div className='menu-item' onClick={this.props.setVoice}>
										<div className={`icon-wrapper ${selVoice?'active':''}`}>
											<SvgMic></SvgMic>
										</div>
									</div>
								</div>
							}
						</div>
					}
				</div>
			</div>
		);
	}
}
