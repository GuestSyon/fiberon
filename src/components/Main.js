import React from 'react';
import axios from 'axios';
import jQuery from 'jquery';
import WelcomeComponent from './Welcome';
import CanvasComponent from './Canvas';
import TopCornerComponent from './TopCorner';
import GuideTourComponent from './GuideTour';
import MenuComponent from './Menu';
import MenuMobileComponent from './MenuMobile';
import InfoModalComponent from './InfoModal';
import ProductModalComponent from './ProductModal';
import ObjectModalComponent from './ObjectModal';
import LoadingComponent from './Loading';
import ToolComponent from './Tool';
import VoiceComponent from './Voice';
import VideoComponent from './Video';
import GuideModalComponent from './GuideModal';
import GuideVideoModalComponent from './GuideVideoModal';
import GuideExploreComponent from './GuideExplore';
import FavorModalComponent from './FavorModal';
import SelNoteComponent from './SelNote';
import BookModalComponent from './BookModal';
import AudioComponent from './Audio';
import { GetDevice, SetDarkCol, GetModalData, isMobile } from '../data/model';
import { modelColArr, menuColArr } from '../data/constant';
import { baseUrl } from '../data/config';
import { colParamountArr } from '../data/menuInfo';
import imgLogo from '../assets/images/logo.png';
import {modelArr} from '../data/constant';

import '../assets/css/index.css';

const skipTest = false;
const device = GetDevice();
const apiDevice = isMobile();

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.oldColArr = [];
		modelColArr.forEach(item => { this.oldColArr.push({...item}); });
		const wSize = {width:window.innerWidth, height: device?window.innerHeight - 0:window.innerHeight};
		this.state = {pageKey:'welcome', loadPro: 0, selScene:'home', speaker:false, modelColArrStr:JSON.stringify(modelColArr), menuColArrStr:JSON.stringify(menuColArr), lightMode:false, selVoice:false, wishlists:[], openToolId:null, menuOver:false, wSize, noteArr:[], portrait:window.innerWidth<window.innerHeight };
	}

	componentDidMount() {
		this.setState({loading:true, loadPro:0});
		this.setCanvasSize();
		window.addEventListener('resize', this.setCanvasSize);
		window.addEventListener('orientationchange', ()=> {
			for (let i = 0; i < 7; i++) {
				setTimeout(() => { this.setCanvasSize(); }, 200 * i);
			}
		});
		const urlParams = new URLSearchParams(window.location.search);
		const user_id = urlParams.get('user_id'), preEmail = urlParams.get('email');
		if (user_id) {
			this.setState({userInfo:{id:user_id}, pageKey:'canvas', speaker:true}, () => {this.getWishListData()});
		} else if (preEmail) {
			this.setState({preEmail, speaker:false});
		}
	}

	setCanvasSize = () => {
		const portrait = window.innerHeight>window.innerWidth;
		this.setState({portrait});
		this.setState({wSize:{width:window.innerWidth, height:window.innerHeight}});
		if (window.innerWidth < window.innerHeight) {
			jQuery('#container').css({display:'none'});
			jQuery('.modal-back').css({display:'none'});
		} else {
			jQuery('#container').css({display:'initial'});
			jQuery('.modal-back').css({display:'flex'});
			jQuery('.note-modal').css({display:'none'});
		}
	}

	getWishListData = () => {
		axios.post(baseUrl+"/api/wishlist/get", { user_id: this.state.userInfo.id }).then((res) => {
			if (res.data.response == "success" && res.data.wishlists) {
				this.setState({wishlists:res.data.wishlists})
			} else {
				window.alert('Failed to get wishlists data');
			}
		});
	}

	removeWishlist = (id) => {
		axios.post(baseUrl+"/api/wishlist/remove", { user_id: this.state.userInfo.id, id }).then((res) => {
			if (res.data.response == "success" && res.data.wishlists) {
				this.setState({wishlists:res.data.wishlists})
			} else {
				window.alert('Failed to get wishlists data');
			}
		});
	}

	changeWishlist = (section_id) => {
		axios.post(baseUrl+"/api/wishlist/post", { user_id: this.state.userInfo.id, section_id }).then((res) => {
			this.getWishListData();
		});
	}

	closeWishlist = () => {
		this.setState({showWishlistInner:false});
		setTimeout(() => { this.setState({showWishlist:false}); }, 500);
	}

	onClickWishlist = (item) => {
		if (!item.location) return;
		var nextScene, location = item.location.toLowerCase();
		if 		(location.includes('promenade') || location.includes('paramount')) nextScene = 'promenade';
		else if (location.includes('concordia')) nextScene = 'concordia';
		else if (location.includes('good')) nextScene = 'goodlife';
		else if (location.includes('sanctuary')) nextScene = 'sanctuary';
		if (nextScene) {
			this.closeWishlist();
			if (nextScene !== this.state.selScene)
				this.setState({lightMode:false, selScene:nextScene, readyModalId:item.section_id})
			else {
				this.openObjectModal(item.section_id);
			}
		}
	}

	setResetColor = () => {
		const {selScene, scenePos, modelColArrStr, menuColArrStr} = this.state;
		const oldColInfo =  this.oldColArr.find(item=>item.key===selScene);
		var newColArr = JSON.parse(modelColArrStr), newMenuArr = JSON.parse(menuColArrStr);
		newColArr.forEach((modelItem, idx) => {
			if (modelItem.key === selScene) {
				Object.keys(oldColInfo).forEach(colorKey => {
					if (colorKey==='key') return;
					if (selScene === 'promenade') {
						if (scenePos===0 && colorKey === 'paramount') return;
						if (scenePos===1 && colorKey === 'promenade') return;
					}
					modelItem[colorKey]=oldColInfo[colorKey];
					newMenuArr[idx][colorKey]=oldColInfo[colorKey];
				});
			}
		});
		this.setState({modelColArrStr:JSON.stringify(newColArr), menuColArr:JSON.stringify(newMenuArr)});
	}

	setModelColArr = (colorKey, item) => {
		const {modelColArrStr, menuColArrStr, selScene, scenePos, userInfo} = this.state;
		var modelColArr = JSON.parse(modelColArrStr), menuColArr = JSON.parse(menuColArrStr);
		modelColArr.forEach((modelItem, idx) => {
			if (modelItem.key === selScene) {
				var realKey = colorKey, realCol = item.hexVal;
				if (modelItem.key === 'promenade' && colorKey === 'deck') {
					realKey = scenePos===0?'promenade':'paramount';
				}
				menuColArr[idx] = {...menuColArr[idx], [realKey]:realCol};
				if (modelItem.key === 'promenade' || modelItem.key === 'deck' || realKey==='furniture') realCol = SetDarkCol(realCol);
				modelItem[realKey]=realCol;
				if (realKey==='paramount') {
					const {stepCol} = colParamountArr.find(paraItem=>paraItem.hexVal===item.hexVal), realStepCol = SetDarkCol(stepCol);
					modelItem.step = realStepCol;
				}
			}
		});
		this.setState({modelColArrStr:JSON.stringify(modelColArr), menuColArrStr:JSON.stringify(menuColArr)});
	}

	showFirstVideo = () => {
		this.setState({firstVideo:true}, () => { this.openObjectModal(320) });
	}

	setGuideType = (guideType) => {
		this.setState({guideType}, () => {
			const {guideType} = this.state;
			if (!guideType) { this.setState({guideMode:false}); }
		});
	}

	setCanvasScene = (selScene) => {
		this.setState({lightMode:false, pageKey:'canvas', selScene});
	}

	setObjType = (type, title) => {
		if (type==='video') this.setState({speaker:false});
		else this.setState({speaker:this.oldSpeaker});
		if (type==='video' || type==='pdf' || type==='images') {
			if (type==='video' && !title) return;
			// gtag("event", type+"_views", { sceneName: this.state.selScene, scenePos: this.state.scenePos, [type+'_name']: title});
		}
	}
	openObjectModal = (hotId) => {
		this.oldSpeaker = this.state.speaker;
		const selObject = GetModalData(hotId);
		this.setState({selObject}, ()=>this.setState({objectInner:true}))
	}

	callNoteAPI = () => {
		const {userInfo, selNote} = this.state;
		axios.post(baseUrl+"/api/notifications-list", { user_id: userInfo.id }).then((res) => {
			if (res.data.response == "success" && res.data.notifications) {
				var noteArr = [], curNote;
				const curTime = new Date(), estStr = curTime.toLocaleString('en-US', { timeZone: 'America/New_York' });
				const strArr = estStr.split(' '), timeValArr = strArr[1].split(':'), apVal = strArr[2]==='PM'?12:0;
				const hourVal = parseInt(timeValArr[0])+apVal, minVal = parseInt(timeValArr[1]);
				res.data.notifications.forEach(item => {
					var disable = false;
					const delivery = this.getAPITime(item.delivery_time), startTime = this.getAPITime(item.active_from), endTime = this.getAPITime(item.active_until);
					if ( delivery[0] < hourVal) disable = true;
					else if (delivery[0] === hourVal) {
						if ( delivery[1] < minVal) disable = true;
					}
					const noteItem = {...item, startLabel:startTime[2], endLabel:endTime[2], deliveryLabel:delivery[2], disable}
					noteArr.push(noteItem);
					if (delivery[0]===hourVal && delivery[1]===minVal) curNote = noteItem;
				});
				this.setState({noteArr})
				if (curNote && !selNote) this.setState({selNote:curNote}, ()=> this.setState({selNoteInner:true}))
			} else {
				window.alert('Failed to get notifiaction data');
			}
		});
		setTimeout(() => { this.callNoteAPI() }, 30 * 1000);
	}

	getAPITime = (timeStr) => {
		var strArr = timeStr?timeStr.split(':'):['23', '59', '59'], convertArr = [], apStr = 'AM', hourVal;
		convertArr[0] = parseInt(strArr[0]); convertArr[1] = parseInt(strArr[1]);
		if (convertArr[0] > 12) {apStr = 'PM'; hourVal = convertArr[0]-12;} else hourVal = convertArr[0];
		convertArr[2] = hourVal+':'+strArr[1]+' '+apStr;
		return convertArr;
	}

	openInfoModal = () => {
		this.setCanvasSize();
		this.setState({infoModal:true}, ()=>this.setState({infoInner:true}));
	}

	render() {
		const {pageKey, selPos, loadPro, infoModal, infoInner, selProduct, productInner, selObject, objectInner, loading, userInfo, preEmail, selScene, speaker, modelColArrStr, menuColArrStr, lightMode, showFirst, guideModal, guideInner, guideMode, guideType, guideVideoModal, guideVideoInner, selVoice, scenePos, wishlists, showWishlist, showWishlistInner, openToolId, menuOver, firstVideo, readyModalId, nextPos, nextScene, portrait, wSize, noteArr, selNote, selNoteInner, toolModal, toolInner, bookModal, bookInner} = this.state;
		const menuVisible = (showFirst||firstVideo||guideMode)?false:true;
		return (
			<div className={`page-wrapper ${device} ${device?'mobile':'web'} ${pageKey}-page ${portrait?'portrait':''}`}>
				<CanvasComponent
					pageKey={pageKey}
					device={device}
					apiDevice={apiDevice}
					userInfo={userInfo}
					wSize={wSize}
					selScene={selScene}
					modelColArrStr={modelColArrStr}
					lightMode={lightMode}
					callPage={(pageKey)=>this.setState({pageKey})}
					setLoadPro={(loadPro)=>{
						this.setState({loadPro}, () => {
							if (loadPro < 100) return;
							setTimeout(() => { this.setState({loading:false}); }, 1000);
							setTimeout(() => { this.setState({loadPro:undefined}); }, 2000);
						});
					}}
					loading={loading}
					selObject={selObject}
					nextPos={nextPos}
					nextScene={nextScene}
					menuOver={menuOver}
					guideType={guideType}
					setLightMode={(lightMode)=>this.setState({lightMode})}
					setLoading={(loading, loadPro)=>this.setState({loading, loadPro}, ()=> {
						if (!loading && readyModalId) {
							this.openObjectModal(readyModalId);
							this.setState({readyModalId:undefined});
						}
					})}
					setScenePos={(scenePos)=>this.setState({scenePos})}
					unsetNextPos={()=>this.setState({nextPos:0})}
					saveBackAudio={()=>this.balanceSpeaker=speaker}
					returnBackAudio={()=>this.setState({speaker:this.balanceSpeaker})}
					setBackAudio={(val)=>this.setState({speaker:val==='play'?this.balanceSpeaker:false})}
					openObjectModal={this.openObjectModal}
					openToolModal={()=>this.setState({toolModal:true}, () => this.setState({toolInner:true}) ) }
					openBookModal={()=>this.setState({bookModal:true}, () => this.setState({bookInner:true}) ) }
				></CanvasComponent>
				{!device && <MenuComponent
					menuVisible={menuVisible}
					apiDevice={apiDevice}
					pageKey={pageKey}
					selPos={selPos}
					userInfo={userInfo}
					selScene={selScene}
					speaker={speaker}
					lightMode={lightMode}
					infoModal={infoModal}
					selVoice={selVoice}
					scenePos={scenePos}
					skipTest={skipTest}
					selProduct={selProduct}
					menuColArrStr={menuColArrStr}
					toolModal={toolModal}
					setMenuOver={(menuOver)=>this.setState({menuOver})}
					setSpeaker={()=>{this.setState({speaker:!speaker})}}
					setVoice={()=> this.setState({selVoice:!selVoice})}
					setLoading={(loading)=>this.setState({loading, loadPro:false})}
					setModelColor={this.setModelColArr}
					setResetColor={this.setResetColor}
					setLightMode={()=>this.setState({lightMode:!lightMode})}
					openInfoModal={()=> this.openInfoModal() }
					openGuideModal={()=>this.setState({guideModal:true, guideMode:true}, ()=>this.setState({guideInner:true}))}
					openProductModal={(val)=>this.setState({selProduct:val}, ()=>this.setState({productInner:true}))}
					setOpenToolId={(openToolId)=>this.setState({openToolId})}
					openToolModal={()=>this.setState({toolModal:true}, () => this.setState({toolInner:true}) ) }
					callPage={(pageKey, selScene, nextPos)=>{
						this.setState({pageKey});
						if (selScene) {
							if (pageKey==='canvas') {
								this.setState({nextScene:selScene, nextPos}, () => {
									this.setState({lightMode:false, selScene});
								})
							} else if (pageKey==='tool') this.setState({openToolId:selScene});
						}
					}}
				></MenuComponent> }
				{!device && <TopCornerComponent
					userInfo={userInfo}
					apiDevice={apiDevice}
					showFirst={showFirst}
					selScene={selScene}
					noteArr={noteArr}
					closeWishlist={this.closeWishlist}
					removeWishlist={this.removeWishlist}
					openWishlist={()=>this.setState({showWishlist:true}, ()=> this.setState({showWishlistInner:true}))}
					selNoteModal={(selNote)=>this.setState({selNote}, ()=> this.setState({selNoteInner:true}))}
				></TopCornerComponent> }
				{device && <MenuMobileComponent
					menuVisible={menuVisible}
					guideType={guideType}
					apiDevice={apiDevice}
					pageKey={pageKey}
					selPos={selPos}
					userInfo={userInfo}
					selScene={selScene}
					noteArr={noteArr}
					speaker={speaker}
					lightMode={lightMode}
					infoModal={infoModal}
					selVoice={selVoice}
					scenePos={scenePos}
					skipTest={skipTest}
					selProduct={selProduct}
					menuColArrStr={menuColArrStr}
					setMenuOver={(menuOver)=>this.setState({menuOver})}
					setSpeaker={()=>{this.setState({speaker:!speaker})}}
					setVoice={()=> this.setState({selVoice:!selVoice})}
					setLoading={(loading)=>this.setState({loading, loadPro:false})}
					setModelColor={this.setModelColArr}
					setResetColor={this.setResetColor}
					setLightMode={()=>this.setState({lightMode:!lightMode})}
					openWishlist={()=>this.setState({showWishlist:true}, ()=> this.setState({showWishlistInner:true}))}
					openInfoModal={()=>this.openInfoModal()}
					openGuideModal={()=>this.setState({guideModal:true, guideMode:true}, ()=>this.setState({guideInner:true}))}
					openProductModal={(val)=>this.setState({selProduct:val}, ()=>this.setState({productInner:true}))}
					setOpenToolId={(openToolId)=>this.setState({openToolId})}
					openToolModal={()=>this.setState({toolModal:true}, () => this.setState({toolInner:true}) ) }
					callPage={(pageKey, selScene, nextPos)=>{
						this.setState({pageKey});
						if (selScene) {
							if (pageKey==='canvas') {
								this.setState({nextScene:selScene, nextPos}, () => {
									this.setState({lightMode:false, selScene});
								})
							} else if (pageKey==='tool') this.setState({openToolId:selScene});
						}
					}}
				></MenuMobileComponent> }
				<FavorModalComponent
					showWishlist={showWishlist}
					showWishlistInner={showWishlistInner}
					wishlists={wishlists}
					onClickWishlist={this.onClickWishlist}
					closeWishlist={this.closeWishlist}
					removeWishlist={this.removeWishlist}
				></FavorModalComponent>
				<InfoModalComponent
					infoModal={infoModal}
					infoInner={infoInner}
					closeInfoModal={(key)=>this.setState({[key]:false})}
				></InfoModalComponent>
				<GuideModalComponent
					guideModal={guideModal}
					guideInner={guideInner}
					setGuideType={this.setGuideType}
					openObject={selObject=>this.setState({selObject}, ()=>this.setState({objectInner:true}) )}
					closeGuideModal={(key)=>this.setState({[key]:false})}
				></GuideModalComponent>
				<GuideVideoModalComponent
					guideVideoModal={guideVideoModal}
					guideVideoInner={guideVideoInner}
					closeGuideVideoModal={(key)=>this.setState({[key]:false}, ()=> { if (key==='guideVideoModal') this.setState({guideMode:false})})}
				></GuideVideoModalComponent>
				<GuideTourComponent
					pageKey={pageKey}
					guideType={guideType}
					closeGuideTour={()=>this.setState({guideType:null, pageKey:'canvas', selScene:'balance'}, () => this.setState({guideMode:false}))}
					gotoStep={(selScene, nextPos)=>{
						this.setState({pageKey:'canvas', nextScene:selScene, nextPos}, () => {
							this.setState({lightMode:false, selScene});
						})
					}}
					gotoTool={()=>this.setState({pageKey:'tool'})}
				></GuideTourComponent>
				<GuideExploreComponent
					guideType={guideType}
					closeGuideExplore={()=>this.setState({guideType:null}, () => this.setState({guideMode:false}))}
				></GuideExploreComponent>

				<ProductModalComponent
					selProduct={selProduct}
					productInner={productInner}
					setScene={(selScene)=>this.setState({lightMode:false, pageKey:'canvas', selScene})} // , ()=> this.setState({})
					closeProductModal={(key)=>this.setState({[key]:false})}
				></ProductModalComponent>
				<ToolComponent
					pageKey={pageKey}
					device={device}
					apiDevice={apiDevice}
					wSize={wSize}
					toolModal={toolModal}
					toolInner={toolInner}
					userInfo={userInfo}
					wishlists={wishlists}
					openToolId={openToolId}
					setOpenToolId={(openToolId)=>this.setState({openToolId})}
					openObject={selObject=>this.setState({selObject}, ()=>this.setState({objectInner:true}) )}
					changeWishlist={this.changeWishlist}
					closeTool={()=>this.setState({toolInner:false}, () => this.setState({toolModal:false}) )}
				></ToolComponent>
				<ObjectModalComponent
					device={device}
					apiDevice={apiDevice}
					userInfo={userInfo}
					selScene={selScene}
					selObject={selObject}
					objectInner={objectInner}
					wishlists={wishlists}
					firstVideo={firstVideo}
					setLoading={(loading)=>this.setState({loading})}
					closeObjectModal={(key)=>this.setState({[key]:false}, ()=>{
						if (key==='firstVideo') this.setState({speaker:true});
						else this.setObjType();
					})}
					changeWishlist={this.changeWishlist}
					setObjType={this.setObjType}
				></ObjectModalComponent>
				<SelNoteComponent
					selNote={selNote}
					selNoteInner={selNoteInner}
					closeSelNote={(key)=>this.setState({[key]:false})}
				></SelNoteComponent>
				<BookModalComponent
					userInfo={userInfo}
					bookModal={bookModal}
					bookInner={bookInner}
					setLoading={loading=>this.setState({loading})}
					closeBookModal={(key)=>this.setState({[key]:false})}
				></BookModalComponent>
				<WelcomeComponent
					device={device}
					apiDevice={apiDevice}
					pageKey={pageKey}
					loading={loading}
					preEmail={preEmail}
					setLoading={(loading, loadPro)=>this.setState({loading, loadPro})}
					skipTest={skipTest}
					callCanvasPage={(userInfo, showFirst)=> {
						this.setState({showFirst, userInfo}, () => {
							this.getWishListData();
							// this.callNoteAPI();
							this.setState({speaker:showFirst?false:true, selScene:'balance'});
							setTimeout(() => { this.setState({pageKey:'canvas'}); }, 1000);
							if (preEmail) {
								this.setState({nextPos:1, toolModal:true}, ()=>this.setState({toolInner:true}));
								setTimeout(() => { this.setState({openToolId:35}); }, 500);
							}
							if (showFirst) {
								this.showFirstVideo();
								// const reqData = {user_id:userInfo.id, mainSection:'Welcome', section_id:'Welcome', page:'First video', device_type:apiDevice};
								// axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {  });
								// this.setState({showFirst:false});
							}
						})
					}}
				></WelcomeComponent>
				{/* {showFirst &&
					<VideoComponent
						pageKey={pageKey}
						endFirstVideo={()=>{this.setState({showFirst:false}); this.showFirstVideo();}}
					></VideoComponent>
				} */}
				<VoiceComponent
					selVoice={selVoice}
					setLightMode={(lightMode)=>this.setState({lightMode, selVoice:false})}
				></VoiceComponent>
				<LoadingComponent
					pageKey={pageKey}
					loading={loading}
					loadPro={loadPro}
				></LoadingComponent>
				<AudioComponent speaker={speaker}></AudioComponent>
				<div className={`back-board portrait-back ${portrait?'active':''} flex`}>
					Please use your device in landscape mode
				</div>
			</div>
		);
	}
}
