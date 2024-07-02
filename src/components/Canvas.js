import React from 'react';
import axios from 'axios';
import jQuery from 'jquery';
import * as THREE from 'three';
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import imgTVBack from '../assets/images/canvas/tv-back.jpg';

import { LoadModel } from '../data/load';
import { baseUrl } from '../data/config';
import { Get2DPos, SetTween, SetColTween, GetHostspotArr, SetVisibleImg, GetGifMapArr, GetBackMesh, fireCount, bookCount} from '../data/model';
import { modelArr, initPlaneMetal, hideHotspotLinks, areaAPIInfo } from '../data/constant';
import videoIconLoop from '../assets/video/icon_loop.mp4';
const initTopLight = 1.5, initAmbLight = 0.5, initMainLight = 0.5, initTopPos = {x:-2, y:3, z:-2}, renderId = 'render2d'; // container

export default class CanvasComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey, selSpace, expand, selScene, modelColArrStr, lightMode, menuOver, nextPos, guideType, wSize} = props;
		this.firstVisit = true;
		this.backMapArr = []; this.modelArr = []; this.overHotMesh = null; this.lightMeshArr = [];
		this.raycaster = new THREE.Raycaster(); this.mouse = new THREE.Vector2(); this.fireTime = 0; this.fireNum = 0; this.bookTime = 0; this.bookNum = 0;
		this.state = {pageKey, selSpace, expand, selScene, modelColArr:[], modelColArrStr, lightMode, menuOver, nextPos, guideType, wSize};
	}

	componentDidMount() {
		this.setCanvasSize();
		this.initScene();
		LoadModel(this);
		this.animate();
		this.fireMapArr = GetGifMapArr('fire/1563572', fireCount);
		this.bookMapArr = GetGifMapArr('book/book', bookCount);
		document.getElementById(renderId).addEventListener('pointerdown', e=> {this.mouseStatus='down'; this.mouseDown = true;});
		document.getElementById(renderId).addEventListener('pointermove', this.onMouseMove);
		document.getElementById(renderId).addEventListener('pointerup', this.onClickWindow);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['pageKey', 'expand', 'guideType', 'menuOver', 'wSize', 'lightMode', 'selScene', 'nextPos', 'modelColArrStr'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				if (key==='pageKey' && nextProps.pageKey==='canvas') this.render3D();
				else if (key==='selScene') {
					if (this.firstVisit) this.firstVisit = false;
					else {this.callAnalyticsAPI(this.state.selScene, 0);}
					this.callAnalyticsAPI(nextProps.selScene, 1);
				}
				this.setState({[key]:nextProps[key]}, () => {
					const {menuOver, selScene, nextPos, scenePos, guideType} = this.state;
					if (key==='menuOver' && menuOver) {
						jQuery('#'+renderId).css({cursor:'default'});
						if (this.overHotMesh) this.closeHotOver();
					} else if (key==='lightMode') {
						this.setLightMode(undefined, true, true);
					} else if (key==='selScene') {
						this.props.setLoading(true);
						setTimeout(() => { this.setSceneModel(); }, 500);
						setTimeout(() => { this.setModelColor(); }, 1000);
					} else if (key==='nextPos' && nextProps.nextScene===selScene && nextPos !== scenePos) {
						if (guideType) this.setNextPos();
						else if (nextPos !== 0) this.setNextPos();
					} else if (key==='wSize') {
						this.setCanvasSize();
					} else if (key==='modelColArrStr') {
						this.setModelColor();
					}
				});
			}
		});
		if (!this.state.userInfo && nextProps.userInfo) {
			this.setState({userInfo:nextProps.userInfo})
		}
	}

	onMouseMove = (e) => {
		this.mouseStatus = 'move';
		if (this.controlChange) return;
		const interHot = this.getHotObject(e);
		if (interHot) {
			jQuery('#'+renderId).css({cursor:'pointer'});
			const {object} = interHot;
			this.overHotMesh = object;
			if (!object.hotLabel) return;
			this.hotAnimate = true;
			const pos2D = Get2DPos(object, this.cWidth, this.cHeight, this.camera);
			const hotStr = this.overHotMesh.hotType==='hide'?'left':'hot';
			jQuery('#'+hotStr+'Wrapper').css({top:pos2D.y, left:pos2D.x});
			jQuery('#'+hotStr+'Label').html(object.hotLabel);
			jQuery('#'+hotStr+'Wrapper').addClass('active');
			if (hotStr==='left') {
				var hotBorder = '';
				jQuery('.canvas .left-wrapper .hot-inner').removeClass('redborder');
				jQuery('.canvas .left-wrapper .hot-inner').removeClass('blueborder');
				if (object.hotLabel.toLowerCase().includes('fypon')) hotBorder = 'blue';
				else if (object.hotLabel.toLowerCase().includes('therma')) hotBorder = 'red';
				jQuery('.canvas .left-wrapper .hot-inner').addClass(hotBorder+'border');
			}

			setTimeout(() => { this.hotAnimate = false; }, 400);
		} else {
			jQuery('#'+renderId).css({cursor:'default'});
			if (this.overHotMesh) this.closeHotOver();
		}
	}

	onClickWindow = (e) => {
		this.mouseDown = false;
		if (!this.props.device && this.mouseStatus==='move') return; else this.mouseStatus = 'up';
		if (e.pointerType==='touch') { // this.props.device
			const interHot = this.getHotObject(e);
			this.overHotMesh = interHot?interHot.object:null;
		}
		this.setClickHotspot();
	}

	onClickHotWrapper = () => {
		this.setClickHotspot();
	}

	setClickHotspot = () => {
		if (!this.overHotMesh) return;
		if (this.overHotMesh.hotId === '0') {
			this.posTarget = parseInt(this.overHotMesh.posTarget);
			this.setCamPosTarget();
			return;
		} else {
			if (this.overHotMesh.hotId.includes('hide')) {
				const interKey = this.overHotMesh.hotId.split('-')[1];
				if (interKey) {
					const interInfo = hideHotspotLinks.find(item=>item.key===interKey);
					if (interInfo) window.open(interInfo.url || 'https://fypon.com/', '_blank');
					else this.props.openObjectModal(parseInt(interKey));
				}
			} else if (this.overHotMesh.hotId === 'book') {
				this.props.openBookModal();
			} else {
				this.props.openObjectModal(this.overHotMesh.hotId);
				this.closeHotOver();
			}
		}
	}

	setCamPosTarget = () => {
		this.mouseDown = true; this.setFireMesh(); this.deckMesh.visible = false;
		const {selScene, guideType} = this.state, selChild = this.totalGroup.children.find(child=>child.modelKey===selScene);
		const selModelInfo = modelArr.find(item=>item.key===selScene), transTime = 1000, {panoType, deckInfo, control, campos} = selModelInfo;
		var nextPos = {x:0, y:0, z:0};
		if (selScene !== 'balance' && this.posTarget!==0) {
			const targetName = 'hotspot_Change-View_0_'+this.posTarget+'_0';
			const selPos = selChild.children.find(item=>item.name===targetName).position;
			nextPos = {x:-selPos.x * selChild.scl, y:(selChild.hotPosY0 - selPos.y) * selChild.scl * 0.5, z:-selPos.z * selChild.scl};
		}
		const nextControl = control[this.posTarget];
		const camPos = campos[this.posTarget];

		this.controls.maxAzimuthAngle = Infinity; this.controls.maxPolarAngle = Infinity;
		this.controls.minAzimuthAngle = -Infinity; this.controls.minPolarAngle = -Infinity;
		if (!panoType) {
			SetTween(selChild, 'position', nextPos, transTime);
			SetTween(this.camera, 'position', camPos, transTime);
		} else {
			this.changePanoBack(selChild.backMapArr, transTime);
		}
		setTimeout(() => {
			this.hotArr = GetHostspotArr(selChild, this.posTarget, guideType);
			SetVisibleImg(selChild, this.posTarget);
			this.setCamControl(camPos, nextControl, true);
			this.props.setScenePos(this.posTarget);
			this.setLightVisible(selChild, this.posTarget.toString());
			jQuery('#'+renderId).css({cursor:'default'});
			this.hideRender2D(); this.showRender2D(selScene);
			if (selScene==='sanctuary') {
				this.lightMeshArr.forEach(lightMesh => { lightMesh.lookAt(this.camera.position); });
			}
			this.setFireMesh(nextControl.fire);
			this.setDeckPano(deckInfo);
			// gtag("event", "screen_views", { sceneName: selScene, scenePos: this.posTarget });
		}, panoType?0:transTime);
		setTimeout(() => { this.mouseDown = false; }, transTime+200);
		this.closeHotOver();
	}

	setFireMesh = (fireInfo) => {
		this.fireTestMesh.visible = fireInfo?true:false;
		if (!fireInfo) return;
		const {x, y, z, rot, sclX, sclY} = fireInfo;
		this.fireTestMesh.position.set(x, y, z);
		this.fireTestMesh.rotation.y = rot;
		this.fireTestMesh.scale.set(sclX, sclY, 1);
	}

	changePanoBack = (backMapArr, transTime) => {
		const nextMap = backMapArr[this.posTarget], stepCount = 10;
		this.backMesh.material.transparent = true;
		this.backMesh0.material.map = nextMap;
		this.backMesh0.material.needsUpdate = true;
		for (let i = 0; i < 1; i+=1/stepCount) {
			setTimeout(() => { this.backMesh.material.opacity = 1 - i; }, transTime/stepCount * i);
		}
		setTimeout(() => {
			this.backMesh.material.map = nextMap;
			this.backMesh.material.opacity = 1;
			this.backMesh.material.transparent = false;
			this.backMesh.material.needsUpdate = true;
		}, transTime + 50);
	}

	closeHotOver = () => {
		this.hotAnimate = true;
		['hot', 'left'].forEach(str => {
			jQuery('#'+str+'Wrapper').removeClass('active');
			jQuery('#'+str+'Label').html('');
		});
		setTimeout(() => {
			this.hotAnimate = false;
			this.overHotMesh = null;
		}, 100);
	}

	getHotObject = (e) => {
		if (!this.hotArr || !this.hotArr.length) return;
		var posX, posY;
		if (e.clientX && e.clientY) {posX = e.clientX; posY = e.clientY;}
		else if (e.touches || e.changedTouches) {
			const touch = e.touches[0] || e.changedTouches[0];
			posX = touch.pageX; posY = touch.pageY;
		} else return;
		this.mouse.x = ( posX / this.cWidth ) * 2 - 1;
		this.mouse.y = - ( posY / this.cHeight ) * 2 + 1;
		this.raycaster.setFromCamera( this.mouse, this.camera );
		return this.raycaster.intersectObjects( this.hotArr )[0];
	}

	setModelColor = () => {
		const {selScene, modelColArrStr} = this.state, modelColArr = JSON.parse(modelColArrStr), selColInfo = modelColArr.find(modelItem=>modelItem.key===selScene);
		if (!selColInfo) return;
		const keyArr = Object.keys(selColInfo), meshKeyArr = keyArr.filter(keyItem=>keyItem!=='key');
		const sceneModel = this.totalGroup.children.find(model=>model.modelKey===selScene);
		if (!sceneModel) return;
		meshKeyArr.forEach(meshKey => {
			sceneModel.children.forEach(child => {
				if (child.name.includes(meshKey)) {
					var colorVal = selColInfo[meshKey];
					if (selScene==='goodlife' && meshKey==='rail' && colorVal===4466204) colorVal = 3021844;
					else if (selScene==='sanctuary' && meshKey==='rail' && colorVal===4466204) colorVal = 2365202;
					else if (selScene==='promenade' && meshKey==='paramount' && child.name.includes('Step')) {
						colorVal = selColInfo.step;
					} else if ((selScene==='sanctuary' || selScene==='promenade') && meshKey==='rail') {
						if (colorVal===0xDFDFDF || colorVal===10263708) {
							if (child.name==='rail_inner') colorVal = 0x1E1E1E;
							else if (child.name==='rail') colorVal = 0xDFDFDF;
						} else if (selScene==='promenade' && colorVal===10197915) colorVal = 0xDFDFDF; // 14540253
					}
					child.material.color.setHex( colorVal );
				}
			});
		});
		this.setDeckPano(sceneModel.deckInfo);
		setTimeout(() => { this.render3D() }, 0);
	}
	setDeckPano = (deckInfo) => {
		if (!deckInfo) { 
			if (this.deckMesh.visible) this.deckMesh.visible = false;
			return;
		}
		const {selScene, modelColArrStr} = this.state, modelColArr = JSON.parse(modelColArrStr), selColInfo = modelColArr.find(modelItem=>modelItem.key===selScene), {deck} = selColInfo;
		const endStr = this.props.device?'_small':'';
		this.props.setLoading(true);
		new THREE.TextureLoader().load('./models/'+selScene+endStr+'/pos_'+this.posTarget+'-deck_'+deck+'.png', (map)=>{
			this.deckMesh.material.map = map;
			this.deckMesh.material.needsUpdate = true;
			this.deckMesh.visible = true;
			this.props.setLoading(false);
			this.render3D();
		})
	}

	setSceneModel = () => {
		this.lightMeshArr = [];
		const {selScene, nextPos, guideType} = this.state;
		const backMap = this.backMapArr.find(mapItem=>mapItem.modelKey===selScene);
		const sceneModel = this.modelArr.find(modelItem=>modelItem.modelKey===selScene);
		// gtag("event", "screen_views", { sceneName: selScene, scenePos: 0 });
		// this.renderer.shadowMap.enabled = selScene==='sanctuary'?false:true;
		this.bookTestMesh = sceneModel.children.find(child=>{return child.name.includes('hotspotBook')});
		this.fireTestMesh.visible = false;
		this.totalGroup.visible = true;
		const modelInfo = modelArr.find(modelItem=>modelItem.key===selScene);
		this.backMesh.material.map = backMap;
		this.backMesh.rotation.y = modelInfo.backRot;
		this.backMesh.material.needsUpdate = true;
		this.totalGroup.children.forEach(child => { if (child.modelKey) this.totalGroup.remove(child); });
		sceneModel.position.set(0, 0, 0);
		this.totalGroup.add(sceneModel);
		this.setCamControl(modelInfo.campos[0], modelInfo.control[0], true, modelInfo.deckInfo);
		this.setFireMesh(modelInfo.control[0].fire);
		this.posTarget = 0;
		this.lightMeshArr = this.setLightVisible(sceneModel, '0', 'getArr');
		const topLight = modelInfo.topLight || initTopPos;
		this.topLight.position.set(topLight.x, topLight.y, topLight.z);
		this.topLight.intensity = modelInfo.topLight ? modelInfo.topLight.int : initTopLight;
		this.topLight.color.setHex(0xFFFFFF);

		this.hotArr = GetHostspotArr(sceneModel, this.posTarget, guideType);
		SetVisibleImg(sceneModel, this.posTarget);
		this.videoMesh = (selScene==='balance')?sceneModel.children.find(item=>item.name==='TV_plane'):null;
		this.hideRender2D();
		if (!modelInfo.deckInfo) this.setDeckPano();
		
		this.setLightMode(true, true, false);
		setTimeout(() => { this.setLightMode(false, false, true); }, 600);
		this.props.setScenePos(0);
		this.showRender2D(selScene);
		if (nextPos) { this.setNextPos(); }
		const videoIconLoop = document.getElementById('videoIconLoop');
		if (selScene==='concordia') videoIconLoop.play(); else videoIconLoop.pause();
	}

	callAnalyticsAPI = (selScene, is_entered) => {
		const modelInfo = modelArr.find(item=>item.key===selScene), {apiKey} = modelInfo;
		const reqData = {user_id:this.state.userInfo.id, section_id:null, mainSection:apiKey, page:apiKey, type:'area', is_entered, device_type:this.props.apiDevice};
		axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {});
	}

	setNextPos = () => {
		this.posTarget = this.state.nextPos;
		this.setCamPosTarget();
		if (!this.state.guideType) this.props.unsetNextPos();
	}

	hideRender2D = () => {
		jQuery('#render2d').css({opacity:0});
		jQuery('.tv-plane-wrapper').css({display:'none'});
		if (this.videoMesh) this.videoMesh.visible = false;
	}

	showRender2D = (selScene) => {
		if (selScene !== 'balance' || this.posTarget !== 1) {
			if (this.balanceTVStatus) {this.props.returnBackAudio(); this.balanceTVStatus = false;}
			return;
		}
		this.props.saveBackAudio(); this.balanceTVStatus = true;
		jQuery('#render2d').css({opacity:1});
		jQuery('.tv-plane-wrapper').css({display:'block'});
		this.videoMesh.visible = true;
	}

	addRender2d = (sceneModel) => {
		const tvMesh = sceneModel.children.find(child=>{return child.name==='TV_plane'});
		const pos = tvMesh.position, rot = tvMesh.rotation, divScale = 10;
		const wrapper = document.getElementById('balanceTVSource');

		const wrapperWidth = 57.4 * divScale * 1.02; wrapper.style.width = wrapperWidth + 'px';
		const wrapperHeight = 33.2 * divScale * 1.02; wrapper.style.height = wrapperHeight  + 'px';

		const object = new CSS3DObject(wrapper);
		object.position.set( pos.x * divScale/10, pos.y * divScale/10, pos.z * divScale/10);
		object.rotation.set( rot.x, Math.PI/2, rot.z);
		this.tvBalance = object;
		this.totalGroup.add(this.tvBalance);
		this.hideRender2D();
	}

	setLightVisible = (sceneModel, scenePos, type) => {
		var lightArr = [];
		sceneModel.children.forEach(child => {
			if (child.name.indexOf('lightMask')>-1) {
				if (type==='getArr') lightArr.push(child);
				const itemPosInfo = child.name.split('_')[1];
				if (itemPosInfo && itemPosInfo !== scenePos) child.visible = false;
				else child.visible = true;
			}
		});
		if (type==='getArr') return lightArr;
	}

	setCamControl = (camPos, control, totalVisible, stopLoading) => {
		this.totalGroup.visible = totalVisible;
		this.camera.position.set(camPos.x, camPos.y, camPos.z);
		this.camera.fov = camPos.fov;
		this.camera.updateProjectionMatrix();
		this.controls.maxAzimuthAngle = control.azimuth.max; this.controls.maxPolarAngle = control.polar.max;
		this.controls.minAzimuthAngle = control.azimuth.min; this.controls.minPolarAngle = control.polar.min;
		if (!stopLoading) setTimeout(() => { this.props.setLoading(false); this.render3D(); }, 0);
	}

	setLightMode = (mode, downMode, upMode) => {
		if (downMode) this.mouseDown = true;
		const {selScene, lightMode} = this.state;
		if (mode === undefined) mode = lightMode;
		const {topLight, backCol, topCol} = modelArr.find(modelItem=>modelItem.key===selScene);
		const lightTime = 500, scaleTime = 500, norCol = {r:1, g:1, b:1};
		var colBackTarget = backCol || {r:0.75, g:0.75, b:0.75};
		var topInt = topCol?topCol.int:0.6, mainInt = 0.4, ambInt = 0.4, castShadow = false, metal=0;
		if (mode === false) {
			topInt = topLight?topLight.int:initTopLight;
			mainInt = initMainLight;
			ambInt = selScene==='sanctuary'?0.7:initAmbLight;
			colBackTarget = norCol;
			castShadow = true;
			metal = initPlaneMetal;
		}

		SetTween(this.topLight, "intensity", topInt, lightTime);
		SetTween(this.mainLight, "intensity", mainInt, lightTime);
		SetTween(this.ambientLight, "intensity", ambInt, lightTime);
		SetColTween(this.backMesh.material, colBackTarget, lightTime);
		if (topCol) SetColTween(this.topLight, mode?topCol:norCol, lightTime);

		setTimeout(() => {
			this.topLight.castShadow = castShadow;
			var lightOpa = (mode)?1:0;
			if (selScene==='sanctuary') lightOpa = 0.85;
			this.lightMeshArr.forEach(lightMesh => {
				SetTween(lightMesh.material, "opacity", lightOpa, scaleTime);
				if (selScene==='sanctuary') { lightMesh.lookAt(this.camera.position); }
			});
			this.totalGroup.children.forEach(child => {
				if (!child.modelKey) return;
				child.children.forEach(mesh => {
					if (mesh.name==='promenade' || mesh.name==='paramount' || mesh.name==='rail') {
						mesh.material.metalness = metal;
						mesh.material.roughness = 1 - metal;
					} else if (mesh.name.includes('lightCenter')) 
						mesh.material.transparent = !mode;
				});		
			});
		}, lightTime);
		setTimeout(() => { if (upMode) this.mouseDown = false; }, lightTime+scaleTime+100);
	}

	initScene = () => {
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		this.renderer.setSize(this.cWidth, this.cHeight);
		if (!document.getElementById("container")) return false;
		document.getElementById("container").appendChild(this.renderer.domElement);

		// this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		// this.renderer.toneMappingExposure = 0.74;
		// this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setPixelRatio( 2 );
		this.renderer.setClearColor(0x000000, 1);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.camera = new THREE.PerspectiveCamera(60, this.cWidth / this.cHeight, 0.01, 100);

		this.scene = new THREE.Scene();
		this.totalGroup = new THREE.Group(); this.scene.add(this.totalGroup);

		this.render2d = new CSS3DRenderer();
		this.render2d.setSize( this.cWidth, this.cHeight );
		this.render2d.domElement.id='render2d';
		const render2d = document.getElementById('render2dWrapper');
		render2d.appendChild( this.render2d.domElement );

		this.controls = new OrbitControls(this.camera, this.render2d.domElement); // renderer
		this.controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
		this.controls.enableZoom = false; this.controls.enablePan = false; this.controls.rotateSpeed = 0.2;
		this.controls.addEventListener('start', () => { this.controlChange = true; });
		this.controls.addEventListener('end', () => this.controlChange = false);
		// this.controls.enablePan = false;

		this.setCamControl({x: 0.09, y: 0, z: -0.02, fov:50}, {azimuth:{max:1.9, min:1.8}, polar:{max:1.8, min:1.2}}, false, true);

		this.ambientLight = new THREE.AmbientLight(0xFFFFFF, initAmbLight); this.scene.add(this.ambientLight);
		this.topLight = new THREE.DirectionalLight(0xFFFFFF, initTopLight * 1 ); this.scene.add( this.topLight );
		this.topLight.position.set(initTopPos.x, initTopPos.y, initTopPos.z);
		this.topLight.castShadow = true;
		this.topLight.shadow.mapSize.width = this.topLight.shadow.mapSize.height = 2048;
		// this.topLight.shadow.camera.near = 0.5;
		// this.topLight.shadow.camera.far = 10;
		this.mainLight = new THREE.DirectionalLight(0xFFFFFF, initMainLight); this.scene.add(this.mainLight); this.mainLight.position.set(5, 5, 5);
		this.backMesh = GetBackMesh(30); this.backMesh0 = GetBackMesh(35); this.deckMesh = GetBackMesh(28, true); this.deckMesh.visible = false;
		this.totalGroup.add(this.backMesh, this.backMesh0, this.deckMesh);
	}

	setCanvasSize = () => {
		// if (window.innerWidth < window.innerHeight) return;
		const {wSize} = this.state;
		this.cWidth = wSize.width;
		this.cHeight = wSize.height;
		if (this.renderer && this.camera) {
			this.renderer.setSize(this.cWidth, this.cHeight);
			this.render2d.setSize(this.cWidth, this.cHeight);
			this.camera.aspect = this.cWidth/this.cHeight;
			this.camera.updateProjectionMatrix();
		}
	}

	setFireAnimate = () => {
		if (!this.fireTestMesh || !this.fireMapArr.length) return;
		this.fireTime+=0.25;
		if (this.fireTime >= fireCount) this.fireTime = 0;
		const fireNum = Math.floor(this.fireTime);
		if (this.fireNum !== fireNum) {
			this.fireTestMesh.material.map = this.fireMapArr[fireNum];
			this.fireNum = fireNum;
			this.render3D();
		}
	}

	setBookAnimate = () => {
		if (!this.bookTestMesh || !this.bookMapArr.length) return;
		this.bookTime-=0.1;
		if (this.bookTime < 0) this.bookTime = bookCount;
		const bookNum = Math.floor(this.bookTime);
		if (this.bookNum !== bookNum) {
			this.bookTestMesh.material.map = this.bookMapArr[bookNum];
			this.bookNum = bookNum;
		}
	}

	animate=()=>{
		if (!this.camera || !this.scene) return;
		requestAnimationFrame(this.animate);
		if (this.state.pageKey!=='canvas') return;
		const {selScene} = this.state;
		if (this.mouseDown) this.render3D();
		if (this.fireTestMesh && this.fireTestMesh.visible) { this.setFireAnimate();}
		if (this.bookTestMesh && this.bookTestMesh.visible) { this.setBookAnimate();}
		if (selScene === 'balance' && this.posTarget === 1) this.render2d.render(this.scene, this.camera);
		else if (selScene==='concordia' && !this.mouseDown) this.render3D();
	}

	render3D=()=> {
		this.camera.lookAt( 0, 0, 0 );
		this.renderer.render(this.scene, this.camera);
	}

	render() {
		const {pageKey} = this.state;
		return (
			<div className={`back-board canvas ${pageKey==='canvas'?'active':''}`}>
				<div id='container'></div>
				<div className='render-2d' id='render2dWrapper'></div>
				<div className='hot-wrapper hotOver-wrapper flex' id='hotWrapper' onClick={this.onClickHotWrapper}>
					<div className='hot-inner flex' id='hotInner'>
						<label id='hotLabel'></label>
						<div className='hot-arrow'></div>
					</div>
				</div>
				<div className='left-wrapper hotOver-wrapper flex' id='leftWrapper' onClick={this.onClickHotWrapper}>
					<div className='hot-inner flex' id='leftInner'>
						<label id='leftLabel'></label>
					</div>
				</div>
				<div className='tv-plane-source' id='balanceTVSource'>
					<div className='tv-plane-wrapper'>
						<div className='tv-plane-inner'>
							<div className='tv-plane-back stage-main-back multi-modal-content flex'>
								<img src={imgTVBack} alt=''></img>
								<div className={`canvasIcon main-item`} id={`canvasIcon`} onClick={this.props.openToolModal} onTouchEnd={this.props.openToolModal}>
									<div className='hot-circle flex'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<video id='videoIconLoop' src={videoIconLoop} loop playsInline></video>
			</div>
		);
	}
}
