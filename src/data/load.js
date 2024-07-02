import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import { modelArr, initPlaneMetal } from './constant';

import imgEnvFR from '../assets/images/envTexture/XXX_FR0.jpg';
import imgEnvBK from '../assets/images/envTexture/XXX_BK0.jpg';
import imgEnvUP from '../assets/images/envTexture/XXX_UP0.jpg';
import imgEnvDN from '../assets/images/envTexture/XXX_DN0.jpg';
import imgEnvLF from '../assets/images/envTexture/XXX_LF0.jpg';
import imgEnvRT from '../assets/images/envTexture/XXX_RT0.jpg';

import imgEnv0FR from '../assets/images/envTexture/back_FR.jpg';
import imgEnv0BK from '../assets/images/envTexture/back_BK.jpg';
import imgEnv0UP from '../assets/images/envTexture/back_UP.jpg';
import imgEnv0DN from '../assets/images/envTexture/back_DN.jpg';
import imgEnv0LF from '../assets/images/envTexture/back_LF.jpg';
import imgEnv0RT from '../assets/images/envTexture/back_RT.jpg';

import imgLight from '../assets/images/light.png';
import imgLightBottom from '../assets/images/light_bottom.png';
import imgLightFloor from '../assets/images/light_floor.png';
import imgLightYellow from '../assets/images/light_yellow.png';
import imgLightColumn from '../assets/images/light_column.png';
import imgWhiteWood from '../assets/images/canvas/promenade_0.jpg';
import imgWhiteWoodOld from '../assets/images/canvas/promenade_0_old.jpg';
import imgParaWood from '../assets/images/canvas/paramount.jpg';
import imgDeckGeneral from '../assets/images/canvas/deck_general.jpg';
import imgTVFront from '../assets/images/canvas/tv_front.jpg';
import imgPillowBump from '../assets/images/canvas/pillow_bump.jpg';
import imgBalance from '../assets/images/canvas/balance.jpg';

function getLightMat (img, depthTest, opacity) {
	const lightMap = new THREE.TextureLoader().load(img);
	return new THREE.MeshBasicMaterial({transparent:true, map:lightMap, depthTest, opacity:opacity?opacity:1, side:2});
}

const lightMatGeneral = getLightMat(imgLight, false);
const lightMatBottom = getLightMat(imgLightBottom, false, 0.8);
const lightMatFloor = getLightMat(imgLightFloor, false);
const lightMatColumn = getLightMat(imgLightColumn, false);
const lightMatYellow = getLightMat(imgLightYellow, false);
const lightMatSpec = getLightMat(imgLightYellow, true);

const imgEnvArr = [imgEnvFR, imgEnvBK, imgEnvUP, imgEnvDN, imgEnvLF, imgEnvRT];
const imgEnv0Arr = [imgEnv0FR, imgEnv0BK, imgEnv0UP, imgEnv0DN, imgEnv0LF, imgEnv0RT];

const envMap = new THREE.CubeTextureLoader().load(imgEnvArr);
const envMap0 = new THREE.CubeTextureLoader().load(imgEnv0Arr);
const matTableIce = new THREE.MeshStandardMaterial({envMap, color:0xCDECF3, metalness:0.5});

const mapBook = new THREE.TextureLoader().load('./book/book-0.png');
const matBook = new THREE.MeshBasicMaterial({transparent:true, map:mapBook, needsUpdate:true});
const matNonDisplay = new THREE.MeshBasicMaterial({transparent:true, opacity:0});
const goodLineMat = new THREE.MeshStandardMaterial({color:0x262626});
const mapBalanceIcon = new THREE.TextureLoader().load(imgBalance), matBalanceIcon = new THREE.MeshBasicMaterial({map:mapBalanceIcon});

export const hotLabelInfo = {
	FBMC: 'Fypon Beam Mantels, Click here to learn more',
	FBC: 'Fypon Beams, Click here to learn more',
	FWTC: 'Fypon Window Trim, Click to learn more',
	TTDC: 'ThermaxxTru Door',
	FCWL: 'Fypon Column Wrap, Learn More',
	FWC: 'Fiberon Wildwood Cladding with Fiberon Lighting',
	TTV: 'Therma-Tru Veris, Click to learn more',
	LCM: 'Leave a Celebration Message',
}

export function LoadModel(self) {
	const preStr = self.props.device?'small_':'middle_'; var loaded = 0;
	modelArr.forEach((modelItem) => {
		const backMap = new THREE.TextureLoader().load('./models/' + preStr + modelItem.backImg+'.jpg');
		backMap.minFilter = THREE.LinearFilter;
		backMap.magFilter = THREE.LinearFilter;
		backMap.anisotropy = 16;
		backMap.modelKey = modelItem.key;
		self.backMapArr.push(backMap);

		const dracoLoader = new DRACOLoader(), dracoPath = 'https://www.gstatic.com/draco/v1/decoders/';
		dracoLoader.setDecoderPath(dracoPath);
		const loader = new GLTFLoader;
		loader.setDRACOLoader(dracoLoader);
		loader.load('./models/'+preStr+modelItem.modelSrc+'.glb', (object) => {
			object = CustomModel(object.scene, modelItem);
			if (modelItem.panoType) {
				object.backMapArr = []; object.deckInfo = modelItem.deckInfo;
				modelItem.campos.forEach((posInfo, idx) => {
					object.backMapArr[idx] = new THREE.TextureLoader().load('./models/'+preStr+posInfo.backImg+'.jpg');
				});
				if (modelItem.key==='balance') self.addRender2d(object)
			}
			self.modelArr.push(object);
			loaded++
			self.props.setLoadPro(Math.round(loaded/modelArr.length*100) );
		}, (xhr) => {   }, (error) => { })
	});
	const fireGeo = new THREE.PlaneGeometry(1, 1),
		fireMap = new THREE.TextureLoader().load('./fire/1563572-0.png'),
		fireMat = new THREE.MeshBasicMaterial({map:fireMap, transparent:true, side:2}); // , color:0xFF0000
	self.fireTestMesh = new THREE.Mesh(fireGeo, fireMat);
	self.totalGroup.add(self.fireTestMesh);
}

export function CustomModel(object, modelItem) {
	const vPos = new THREE.Box3().setFromObject(object), vSize = vPos.getSize(new THREE.Vector3()), scl = 5 / Math.max(vSize.x, vSize.z);
	const videoIconLoop = document.getElementById('videoIconLoop'), mapVideoIconLoop = new THREE.VideoTexture(videoIconLoop), matIconLoop = new THREE.MeshBasicMaterial({map:mapVideoIconLoop});
	object.modelKey = modelItem.key; object.topLight = modelItem.topLight;
	object.scale.set(scl, scl, scl);
	object.vSize = vSize; object.scl = scl; object.hotPosY0 = modelItem.hotPosY0;
	object.traverse(child => {
		if (child instanceof THREE.Mesh) {
			if (child.material.length)  child.material.forEach(mat => { mat.side = 2; });
			else child.material.side = 2;
			if (child.name.includes('promenade') || child.name === 'paramount' || child.name.includes('Step') || child.name.includes('deck')) {
				var img = imgWhiteWood;
				if (child.name==='paramount') {img = imgParaWood;}
				// else if (modelItem.key==='sanctuary') img = imgDeckSanctuary; // imgWhiteWoodOld;
				else if (modelItem.key==='sanctuary') img = imgWhiteWoodOld;
				else if (modelItem.key==='goodlife' || modelItem.key==='concordia') img = imgDeckGeneral; // imgWhiteWoodOld; // imgParaWood; // 
				const map = new THREE.TextureLoader().load(img); map.wrapS = map.wrapT = 1000;
				map.minFilter = THREE.LinearFilter;
				map.magFilter = THREE.LinearFilter;
				map.anisotropy = 16;
	
				const roughDelta = modelItem.key==='concordia'?0.2:0;
				if (child.name.includes('deck')) { child.material = new THREE.MeshStandardMaterial({side:2, map,  envMap, roughness:0.6+roughDelta}); } 
				else child.material = new THREE.MeshPhysicalMaterial({side:2, map, envMap, roughness:0.7+roughDelta, metalness:initPlaneMetal, reflectivity:1});
				if (child.name==='paramount_Step_Vertical') child.castShadow = true;
				else child.receiveShadow = true;
			} else if (child.name === 'custom_fire') { child.visible = false;
			} else if (child.name.includes('noShadow')) { 
			} else if (child.name.includes('chair_frame')) { 
				const chairMap = child.material.map;
				child.material = new THREE.MeshStandardMaterial({map:chairMap, side:2, color:0x121212, metalness:1, roughness:0, envMap});
				child.castShadow = true;
			} else if (child.name.includes('chair_pillow')) { 
				const chairMap = child.material.map;
				// child.material = new THREE.MeshStandardMaterial({map:chairMap, side:2, metalness:0, roughness:1});
				// child.material = new THREE.MeshToonMaterial({map:chairMap, color:0x9D9D9D, side:2, shininess:0});
				const bumpMap = new THREE.TextureLoader().load(imgPillowBump);
				child.material = new THREE.MeshPhysicalMaterial({map:chairMap, side:2, shininess:0, reflectivity:0, bumpMap, bumpScale:0.004});
			} else if (child.name.includes('shiness-0')) { child.material.shininess = 0; child.castShadow = true;
			} else if (child.name.includes('TV_plane')) {
				const sclVal = 10;
				['x', 'y', 'z'].forEach(axis => { child.position[axis] *= sclVal; });
				child.scale.set(sclVal, sclVal, sclVal); child.oriScl = sclVal;
				child.material = new THREE.MeshBasicMaterial({transparent:child.name==='TV_plane'?false:true});
			} else if (child.name === 'TV_front') {
				const mapTV = new THREE.TextureLoader().load(imgTVFront);
				child.material = new THREE.MeshBasicMaterial({map:mapTV, side:2});
			} else if (child.name.includes('glass') && child.name.split('_')[2]) {
				const glassInfo = child.name.split('_')[2].split('-');
				child.material = new THREE.MeshPhongMaterial({envMap, reflectivity:1, transparent:true, opacity:parseInt(glassInfo[0])/10, color:parseInt(glassInfo[1])});
				if (child.name.includes('table')) child.material.envMap = null;
				if (child.name.includes('bottle') || child.name.includes('glass_outer')) {
					child.material.envMap = undefined;
					child.castShadow = true;
				} else if (child.name==='window_glass_9-1122867') {child.material.envMap = envMap0;}
				else if (child.name==='tablebottom_glass_3-11793407') {child.material = new THREE.MeshPhongMaterial({envMap, reflectivity:1, color:0xCCDDEE, side:2});}
			} else if (child.name.includes('floor')) {
				child.receiveShadow = true;
				if (child.name.includes('floor_custom_in')) {
					const {color, map, transparent, opacity} = child.material;
					child.material = new THREE.MeshPhysicalMaterial({side:2, map, envMap, roughness:0.8, metalness:0.8, reflectivity:1});
				} else if (child.name==='floor_rug') {
					const childMap = child.material.map;
					child.material = new THREE.MeshBasicMaterial({map:childMap});
					// child.material.map.offset.y = 0.54; child.material.map.offset.x = -0.3;
				} else if (child.name==='floor_board' ) {
					const boardMap = child.material.map; child.material = new THREE.MeshStandardMaterial({map:boardMap, side:2, color:0x999999});
				} else if (child.name==='custom_floor_plane_new') {
					const {map} = child.material, color=child.material.color.getHex();
					map.offset.y = -0.2;
					child.material = new THREE.MeshStandardMaterial({map, color:0xB3B3B3});
				}
			} else if (child.name.includes('hotspot')) {
				child.material = new THREE.MeshBasicMaterial({color:0xE02F25, side:2});
				const hotInfo = child.name.split('_'), hotLabel=hotLabelInfo[hotInfo[1]]||hotInfo[1].split('-').join(' '), hotId=hotInfo[2];
				child.hotInfo=hotInfo; child.hotLabel=hotLabel; child.hotId=hotId; child.hotPos=hotInfo[3].split('-');
				if (child.hotId==='0') { child.posTarget = hotInfo[4]; }
				if (modelItem.key==='balance') {
					const sclVal = 10;
					['x', 'y', 'z'].forEach(axis => { child.position[axis] *= sclVal; });
					child.scale.set(sclVal, sclVal, sclVal); child.oriScl = sclVal;
				}
				if (child.name.includes('hotspotNone')) {
					child.hotType = 'hide';
					child.material = matNonDisplay;
					child.hotLabel = hotLabel.split('xx').join('-');
				} else if (child.name.includes('hotspotBook')) {
					child.material = matBook;
				}
			} else if (child.name.includes('lightMask')) {
				child.specPos = child.name.split('_')[1];
				if 		(child.name.includes('Bottom')) child.material = lightMatBottom;
				else if (child.name.includes('Floor')) child.material = lightMatFloor;
				else if (child.name.includes('Spec')) child.material = lightMatSpec;
				else if (modelItem.key==='promenade') child.material = lightMatColumn;
				else if (modelItem.key==='concordia') child.material = lightMatYellow;
				else 								child.material = lightMatGeneral;
			} else if (child.name.includes('imgMesh')) {
				const imgInfo = child.name.split('_'), imgLabel = imgInfo[1]; child.imgPos = imgInfo[2].split('-');
				if 		(imgLabel==='videoLoopIcon') child.material = matIconLoop;
				else if (imgLabel==='balanceIcon') child.material = matBalanceIcon;
			} 
			else if (child.name.includes('table_ice')) child.material = matTableIce;
			else if (child.name.includes('dek_line')) child.material = goodLineMat;
			else if (child.name.includes('lightCenter')) child.material.opacity = 0.4;
			else if (child.name==='table_glas_maker') child.material.envMap = envMap;
			else if (modelItem.key==='sanctuary') {
				if (child.name === 'furniture') child.castShadow = true;
				const {map} = child.material, color = child.material.color.getHex();
				child.material = new THREE.MeshStandardMaterial({map, color, side:2});
				if (child.name === 'Object_4475') child.material.map.offset.y = 0.05;
			} else {
				child.castShadow = true;
			}
		}
	})
	return object;
}