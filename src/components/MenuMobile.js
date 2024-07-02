import React from 'react';
import axios from 'axios';

import NoteModalComponent from './NoteModal';
import imgRighthambagar from '../assets/images/menu/right-icon.png';
import imgLeftSetting from '../assets/images/menu/left-icon.png';
import imgClose from '../assets/images/menu/close-icon.png';
import imgBack from '../assets/images/menu/back-icon.png';

import {ReactComponent as SvgAlert} from '../assets/images/home/alert.svg';
import {ReactComponent as SvgHeart} from '../assets/images/home/heart.svg';

import {ReactComponent as SvgHome} from '../assets/images/menu/left-home.svg';
import {ReactComponent as SvgInfo} from '../assets/images/menu/left-info.svg';
import {ReactComponent as SvgSpeak} from '../assets/images/menu/left-speak.svg';
import {ReactComponent as SvgHide} from '../assets/images/menu/right-hide.svg';
import {ReactComponent as SvgReset} from '../assets/images/menu/right-reset.svg';
import {ReactComponent as SvgMoon} from '../assets/images/menu/right-moon.svg';
import {ReactComponent as SvgSun} from '../assets/images/menu/right-sun.svg';
import {ReactComponent as SvgMic} from '../assets/images/menu/right-mic.svg';

import { mobileMain, colorDeckArr, mobileRightMain, mobileLeftMain, stickExperienceInfo, stickProductInfo } from '../data/menuInfo';
import { GetRowInfo } from '../data/model';
import { baseUrl } from '../data/config';
import { modelArr } from '../data/constant';

const conDeckKey = 'conMainDeck', goodDeckKey = 'goodMainDeck';
const concordiaDeckInfo = [ {key:'conSubDeckSymmetry', label:'Symmetry'}, {key:'conSubDeckHorizon', label:'Horizon'}, {key:'conSubDeckAstir', label:'Astir'}]
const conDeckStick = {key:conDeckKey, stickInfo:concordiaDeckInfo, middle:true, label:'Decking'}
const goodlifeDeckInfo = [ {key:'goodSubDeckEscapes', label:'Escapes'}, {key:'goodSubDeckWeekender', label:'Weekender'}]
const goodDeckStick = {key:goodDeckKey, stickInfo:goodlifeDeckInfo, middle:true, label:'Decking'}

export default class MenuMobileComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey, userInfo, selScene, speaker, lightMode, guideType, selVoice, scenePos, selProduct, noteArr, menuColArrStr} = props;
		this.state = {pageKey, userInfo, selMenu:'home', selScene, speaker, lightMode, guideType, selVoice, scenePos, colInfo:{}, selProduct, noteArr, menuColArrStr, leftMenuArr:[]};
		this.menuColArr = JSON.parse(menuColArrStr);
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['selHotspot', 'pageKey', 'userInfo', 'selScene', 'scenePos', 'speaker', 'lightMode', 'guideType', 'infoModal', 'selVoice', 'selProduct', 'menuColArrStr'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, () => {
					if (key==='selProduct' && this.state.selProduct) this.onClickMenuItem({key:'explore'});
					else if (key==='scenePos') {
						const {menuKey, stickItem} = this.state;
						if (menuKey==='deck') this.setStickDeckInfo(stickItem);
					} else if (key==='menuColArrStr') {
						this.menuColArr = JSON.parse(this.state.menuColArrStr);
						this.setColInfo();
					} else if (key==='selScene') {
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

	setDeckColInfo = (oldStickItem) => {
		var {selScene, scenePos} = this.state;
		if (selScene==='promenade' && scenePos===1) selScene = 'paramount';
		else if (oldStickItem.key.includes('SubDeck')) selScene = oldStickItem.key;
		// else if (oldStickItem.key.includes('goodlifeDeck')) selScene = oldStickItem.key;
		const colInfo = colorDeckArr.find(item=>item.key===selScene);
		return colInfo.colArr;
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

	onClickCenterItem = (centerKey) => {
		if (centerKey==='explore') this.setState({selMenu:centerKey});
		else if (centerKey==='guide') this.props.openGuideModal();
		else if (centerKey==='info') this.props.openInfoModal();
		else if (centerKey==='tool') this.setState({selMenu:'explore', openRight:false}, () => { this.setToolPart(); } )
	}

	closeRightMenu = () => {
		const {subRightArr} = this.state;
		if (subRightArr) this.setState({subRightArr:null});
		else this.setState({openRight:false});
	}

	closeLeftMenu = () => {
		const {colorKey, middleColLabel} = this.state;
		if (colorKey) this.setState({colorKey:null, colArr:[]});
		else if (middleColLabel) this.setState({middleColLabel:null, middleColArr:[]});
		else this.setState({openLeft:false});
		if ((!colorKey || !middleColLabel) && this.apiType) this.callAnalyticsAPI({}, 0);
	}

	onClickNote = () => {
		this.setState({showNote:true}, ()=>this.setState({showNoteInner:true}));
	}
	closeNote = (joinUrl) => {
		this.setState({showNoteInner:false});
		if (joinUrl) { const joinWindow = window.open(joinUrl, '_blank'); joinWindow.focus(); }
		setTimeout(() => { this.setState({showNote:false}) }, 500);
	}
	closeWishlist = () => {
		this.setState({showWishlistInner:false});
		setTimeout(() => { this.props.closeWishlist(false); }, 500);
	}

	onClickRightButton = (subItem, type) => {
		const itemKey = subItem.key;
		if (type==='main') {
			if (itemKey==='balance') this.callCanvasPage(itemKey);
			else if (itemKey==='experience') this.setState({subRightArr:stickExperienceInfo, subRightKey:itemKey});
			else if (itemKey==='product') this.setState({subRightArr:stickProductInfo.filter(item=>{return item.modalInfo}), subRightKey:itemKey});
			else if (itemKey==='tool') {this.props.callPage('tool'); this.setState({openLeft:false, openRight:false})}
		} else if (type==='experience') {
			this.callCanvasPage(itemKey);
			// setTimeout(() => { this.onClickMenuItem({key:'explore'}); }, 100);
		} else if (type==='product') {
			const {title, arr} = subItem.modalInfo, rowArr = GetRowInfo(arr, 2);
			this.props.openProductModal({title, rowArr});
			this.setState({openRight:false, subRightArr:null, subRightKey:null});
		}
	}

	setOpenLeft = () => {
		const leftMenuArr = mobileLeftMain.filter(item=>{return item.sceneArr.includes(this.state.selScene)});
		this.setState({leftMenuArr}, ()=> this.setState({openLeft:true}));
	}

	onClickLeftMainButton = (mainItem) => {
		const itemKey = mainItem.key, {selScene} = this.state;
		if (itemKey === 'deck') {
			if (selScene !== 'concordia' && selScene !== 'goodlife') {
				const colArr = this.setDeckColInfo(mainItem);
				this.setState({colorKey:'deck', colArr});
			}
			else {
				if 		(selScene === 'concordia') this.setState({middleColLabel:'deck', middleColArr:concordiaDeckInfo});
				else if (selScene === 'goodlife') this.setState({middleColLabel:'deck', middleColArr:goodlifeDeckInfo});
			}
		} else this.setState({colorKey:itemKey, colArr:mainItem.colArr});
		this.callAnalyticsAPI(mainItem, 1);
	}

	callAnalyticsAPI = (item, is_entered) => {
		const {selScene, userInfo} = this.state;
		if (is_entered===1) { this.apiType = item.label }
		const modelInfo = modelArr.find(item=>item.key===selScene);
		const reqData = {user_id:userInfo.id, mainSection:modelInfo.apiKey, section_id:this.apiType, page:this.apiType, type:'color_change', is_entered, device_type:this.props.apiDevice};
		axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {  });
		if (is_entered===0) { this.apiType = null; }
	}

	onClickMiddleItem = (middleItem) => {
		const colArr = this.setDeckColInfo(middleItem);
		this.setState({colorKey:middleItem.label, colArr});
	}

	onClickColItem = (item) => {
		const {colorKey, middleColLabel} = this.state, colPart = middleColLabel || colorKey;
		this.props.setModelColor(colPart, item);
	}

	callCanvasPage = (selScene, scenePos) => {
		this.props.callPage('canvas', selScene, scenePos);
		this.setState({openRight:false, subRightArr:null, subRightKey:null});
	}

	onClickMenuItem = (stickItem, subInfo) => {
		const itemKey = stickItem.key;
		if (itemKey === 'media') {}
			// this.onClickMenuItem({key:'explore'});
			// setTimeout(() => { this.onClickMenuItem({key:'tool'}, 35); }, 100);
		else if (itemKey === 'info') this.props.openInfoModal();
		else if (itemKey === 'guide') this.props.openGuideModal(); // this.props.callPage('guide');
		else if (itemKey === 'tool') {this.props.callPage('tool', subInfo); this.setState({selMenuKey:itemKey}); }
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

	onClickHome = () => {
		this.setState({selMenu:'home', subRightArr:null, middleColLabel:null, colorKey:null});
		this.props.callPage('canvas', 'balance');
	}

	getRightClassStr = (item) => {
		var {selScene, scenePos} = this.state, classStr = '';
		if (selScene==='balance') {
			if 		(scenePos !== 2 && item.key==='balance') classStr = 'active';
			else if (scenePos === 2 && item.key==='cladding') classStr = 'active';
		} else if (item.key===selScene) classStr = 'active';
		return classStr;
	}

	getColClassStr = (colItem) => {
		var {colInfo, selScene, scenePos, colorKey} = this.state;
		if (selScene==='promenade' && colorKey==='deck') colorKey = scenePos===0?'promenade':'paramount';
		if (!colInfo || !colInfo[colorKey]) return '';
		return colItem.hexVal === colInfo[colorKey]?'active':'';
	}

	getLeftTitle = () => {
		const {selScene, middleColLabel, colorKey} = this.state;
		if (colorKey) return colorKey + ' Colors';
		else if (middleColLabel) return middleColLabel + ' Colors';
		else return selScene + ' Colors';
	}

	getStickArr = (colorKey, colArr) => {
		const {selScene} = this.state;
		if (colorKey==='rail') {
			if (selScene==='sanctuary' || selScene==='promenade') return colArr;
			else return colArr.filter(item=>{return item.key!=='mix'});
		} else return colArr;
	}

	render() {
		const {pageKey, selMenu, openRight, openLeft, lightMode, subRightArr, subRightKey, noteArr, selScene, speaker, guideType, selMenuKey, infoModal, selVoice, showNote, showNoteInner, leftMenuArr, middleColLabel, middleColArr, colArr, colorKey} = this.state;
		return (
			<>
				{selMenu==='home' && !guideType &&
					<div className='menu-center menu-part flex'>
						{mobileMain.map((item, idx) =>
							<div className={`menu-item flex ${item.key} ${item.key==='tool'?'wide':''}`} key={idx} onClick={()=>this.onClickCenterItem(item.key)}>
								<div className='icon-wrapper flex'><img src={item.img}></img></div>
								<div className='menu-label'>{item.label}</div>
							</div>
						)}
					</div>
				}
				{selMenu==='explore' &&
					<>
					<div className='side-menu-icon menu-icon right-side-icon' onClick={()=>this.setState({openRight:true})}><img src={imgRighthambagar}></img></div>
					{selScene !== 'home' && selScene !== 'balance' && pageKey!=='tool' && <div className='side-menu-icon menu-icon left-side-icon' onClick={this.setOpenLeft}><img src={imgLeftSetting}></img></div>}
					{(openLeft || openRight) && <div className='mobile-menu-back'></div>}
					<div className={`side-menu right-menu ${openRight?'open':''}`}>
						<div className='side-header flex'>
							<div className='menu-icon back-icon' onClick={this.closeRightMenu}>
								<img src={subRightArr?imgBack:imgClose}></img>
							</div>
							{/* <div className='menu-icon' onClick={this.onClickNote}><SvgAlert></SvgAlert></div> */}
							<div className='menu-icon' onClick={this.props.openWishlist}><SvgHeart></SvgHeart></div>
						</div>
						<div className='side-content'>
							<div className='content-wrapper main-wrapper flex'>
								{mobileRightMain.map((item, idx) =>
									<div className='menu-button flex' key={idx}>
										<div className={`button `} onClick={()=>this.onClickRightButton(item, 'main')}> {item.label}</div>
									</div>
								)}
							</div>
							{subRightArr &&
								<div className={`content-wrapper ${subRightKey}-wrapper  flex`}>
									{subRightArr.map((item, idx) =>
										<div className={`menu-button flex ${this.getRightClassStr(item)}`} key={idx}>
											<div className={`button `} onClick={()=>this.onClickRightButton(item, subRightKey)}> {item.label}</div>
										</div>
									)}
								</div>
							}
						</div>
						<div className='side-footer flex'>
							<div className='icon-wrapper home-wrapper' onClick={this.onClickHome}><SvgHome></SvgHome></div>
							<div className={`icon-wrapper speaker-wrapper ${speaker?'':'mute'}`} onClick={this.props.setSpeaker}><SvgSpeak></SvgSpeak></div>
						</div>
					</div>
					<div className={`side-menu left-menu ${openLeft?'open':''}`}>
						<div className='side-header flex'>
							<div className='side-title'>{this.getLeftTitle()}</div>
							<div className='menu-icon back-icon' onClick={this.closeLeftMenu}>
								<img src={(middleColLabel || colorKey)?imgBack:imgClose}></img>
							</div>
						</div>
						<div className='side-content'>
							<div className='content-wrapper main-wrapper flex'>
								{leftMenuArr.map((item, idx) =>
									<div className='menu-button flex' key={idx}>
										<div className={`button `} onClick={()=>this.onClickLeftMainButton(item)}> {item.label}</div>
									</div>
								)}
								{(selScene==='promenade') &&
									<div className='light-part'>
										<div className='label'> {selScene} Lighting</div>
										<label className='switch'>
											<input type="checkbox" checked={lightMode} onChange={this.props.setLightMode}></input>
											<span className='slider round'></span>
										</label>
									</div>
								}
							</div>
							{middleColLabel &&
								<div className={`content-wrapper middle-part flex`}>
									{middleColArr.map((middleItem, middleIdx) =>
										<div className={`menu-button`} key={middleIdx} onClick={()=>this.onClickMiddleItem(middleItem)}>
											<div className='button'>{middleItem.label}</div>
										</div>
									) }
								</div>
							}
							{colorKey &&
								<div className={`content-wrapper ${colorKey}-wrapper flex`}>
									{this.getStickArr(colorKey, colArr).map((colItem, colIdx) =>
										<div className={`col-item menu-button ${this.getColClassStr(colItem)}`} key={colIdx} onClick={()=>this.onClickColItem(colItem)}>
											<div className={`color-wrapper ${colItem.key}`} style={{backgroundColor:colItem.color}}></div>
											<div className='color-label'>{colItem.label}</div>
										</div>
									) }
								</div>
							}
						</div>
					</div>
					</>
				}
				<NoteModalComponent
					showNote={showNote}
					showNoteInner={showNoteInner}
					noteArr={noteArr}
					closeNote={this.closeNote}
				></NoteModalComponent>
			</>
		);
	}
}
