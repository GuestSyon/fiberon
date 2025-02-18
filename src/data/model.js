
import * as THREE from 'three';
import axios from 'axios';
import {Tween, autoPlay, Easing} from "es6-tween";
import {modalData} from '../data/modalData';

autoPlay(true);

// export const controlHome = {azimuth:{max:Infinity, min:-Infinity}, polar:{max:1.84, min:1.20}};
//Rail_inner

export function isMobile() {
	var check = 'Web';
	(function(a){
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
		check = 'Mobile';
	})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

export function GetDevice() {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (window.innerWidth > 1024 || window.innerHeight > 1024) return undefined;
	else if (/windows phone/i.test(userAgent)) { return "windows"; }
	else if (/android/i.test(userAgent)) { return "android"; }
	else if (/iPhone|iPod/.test(userAgent) && !window.MSStream) { return "ipone"; }
	// if (/iPad/.test(userAgent) && !window.MSStream) { return "ipad"; }
	else return undefined;
}

export function GetBackMesh (r, transparent) {
	const sphereGeo = new THREE.SphereGeometry(r, 64, 64);
	const sphereMat = new THREE.MeshBasicMaterial({ side: 2, transparent});
	const backMesh = new THREE.Mesh(sphereGeo, sphereMat);
	backMesh.scale.x = -1;
	return backMesh;
}

export function GetObjModalSize(wWidth, wHeight, rowArr, device, zoom) {
	const sizeR = wWidth>1024?0.9:1, rowH = device?42:55, deltaH = device?70: 90;
	const outWidth = Math.min(wWidth*sizeR-60, 1200), outHeight = Math.min(outWidth * 0.5625, wHeight * sizeR - deltaH - rowArr.length * rowH);
	const defaultW = outHeight/0.5625, w = wWidth<1024?Math.max(wWidth*0.7, defaultW):defaultW;
	const ratio = 100/zoom;
	return {w:w * ratio , h:outHeight * ratio};
}

export const GetRowInfo = (arr, rowCount) => {
	var rowArr = [];
	if (!arr || !arr.length) return [];
	arr.forEach((item, idx) => {
		const num = Math.floor(idx/rowCount), pos = idx % rowCount;
		item.oriIdx = idx;
		if (pos === 0) rowArr[num] = [item];
		else rowArr[num].push(item);
	});
	return rowArr;
}

export function SetTween(obj, attr, info, easeTime) {
	var tweenData = {};
	const easeType = Easing.Cubic.InOut;
	if 		(attr === "opacity") tweenData = {'opacity':info };
	else if (attr === "position") tweenData = {'position.x':info.x, 'position.y':info.y, 'position.z':info.z };
	else if (attr === "intensity") tweenData = {'intensity':info };
	else if (attr === "scale") tweenData = {'scale.x':info.x, 'scale.y':info.y, 'scale.z':info.z };
	else if (attr === "fov") tweenData = {'fov':info };
	// else if (attr === "color") tweenData = {'r': info, 'g':info, 'b':info};
	new Tween(obj).to( tweenData , easeTime ).easing(easeType).start();
}

export function SetColTween(mat, target, easeTime) {
	const stepCount = 20, oriCol = {...mat.color};
	var colDelta = {};
	['r', 'g', 'b'].forEach(axis => { colDelta[axis] = (target[axis] - oriCol[axis])/stepCount; });
	for (let i = 0; i < stepCount; i++) {
		setTimeout(() => {
			mat.color.setRGB( oriCol.r+colDelta.r*i,
							  oriCol.g+colDelta.g*i,
							  oriCol.b+colDelta.b*i);
		}, i * (easeTime/stepCount));
	}
	setTimeout(() => { mat.color.setRGB( target.r, target.g, target.b); }, easeTime+100);
}

export function Get2DPos(obj, cWidth, cHeight, camera) {
	var vector = new THREE.Vector3();
	var widthHalf = 0.5 * cWidth;
	var heightHalf = 0.5 * cHeight;
	obj.updateMatrixWorld();
	vector.setFromMatrixPosition(obj.matrixWorld);
	vector.project(camera);
	vector.x = ( vector.x * widthHalf ) + widthHalf;
	vector.y = - ( vector.y * heightHalf ) + heightHalf;
	return {  x: vector.x, y: vector.y };
};

export function SetDarkCol(oldCol, delta) {
	const oriStr = oldCol.toString(16), oldStr = oriStr.length===5?'0'+oriStr:oriStr;
	const rOld = oldStr.substring(0, 2), gOld = oldStr.substring(2, 4), bOld = oldStr.substring(4, 6);
	const rNew = getIntNum(rOld, delta), gNew = getIntNum(gOld, delta), bNew = getIntNum(bOld, delta);
	const newStr = rNew + gNew + bNew;
	return parseInt(newStr, 16);
}

function getIntNum(hexStr, delta) {
	const newDec = Math.round(parseInt(hexStr, 16) * 0.7);
	const newStr = newDec.toString(16);
	return newStr.length===1?'0'+newStr:newStr;
}

export function GetHostspotArr(sceneModel, posNum, guideType) {
	const scenePos = posNum.toString(), hotArr = [];
	sceneModel.children.forEach(child => {
		if (child.hotPos) {
			child.visible = false;
			if (child.hotPos.includes(scenePos)) {
				if (guideType && child.hotLabel==='Change View') return;
				child.visible = true;
				hotArr.push(child);
			}
		}
	});
	return hotArr;
}

export function SetVisibleImg(sceneModel, posNum) {
	sceneModel.children.forEach(child => {
		if (child.imgPos) {
			child.visible = child.imgPos.includes(posNum.toString());
		}
	});
}

export const fireCount = 103, bookCount = 8;
export function GetGifMapArr (url, count) {
	const mapArr = [];
	for (let i = 0; i < count; i++) {
		const mapItem = new THREE.TextureLoader().load('./'+url+'-'+i.toString()+'.png');
		mapArr.push(mapItem);
	}
	return mapArr;
}

export function DownloadFile (fileUrl) {
	axios.get(fileUrl, { responseType: 'blob'}).then((res) => {
		const url = window.URL.createObjectURL(new Blob([res.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', fileUrl.substring(fileUrl.lastIndexOf('/')+1));
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	});
}

export function DisplayInput() {
	const inputArr = document.getElementsByTagName('input');
	for (let i = 0; i < inputArr.length; i++) {
		const inputItem = inputArr[i];
		inputItem.setAttribute('style', 'display:none');
	}
	document.body.focus();
	setTimeout(() => {
		for (let i = 0; i < inputArr.length; i++) {
			const inputItem = inputArr[i];
			inputItem.setAttribute('style', 'display:initial');
		}
	}, 0);
}

export function GetToolBtnRowArr(arr, cellCount) {
	var buttonArr = [];
	arr.forEach((item, idx) => {
		const rowNum = Math.floor(idx/cellCount), cellNum = idx % cellCount;
		if (cellNum === 0) buttonArr[rowNum] = [item];
		else buttonArr[rowNum].push(item);
	});
	return buttonArr;
}

export function GetModalData(hotId) {
	if 		(hotId==='75') hotId = '13';
	else if (hotId==='19') hotId = '119';
	else if (hotId==='88') hotId = '97';
	const selInfo = modalData.find(item=>item.id===parseInt(hotId));
	if (!selInfo) return {};
	const {hotLabel, data, rowCount, bottomLabel} = selInfo;
	return {title:hotLabel, data, hotId, rowCount, bottomLabel};
}

export function GetZoom() {
	const zoomW = ((window.outerWidth - 10) / window.innerWidth) * 100;
	const zoomH = ((window.outerHeight - 10) / window.innerHeight) * 100;
	var zoomN = Math.max(zoomW, zoomH);
	if (window.innerWidth < 1280 || window.innerHeight < 870) {
		const rezoomW = 1280/window.innerWidth * 100;
		const reZoomH = 870/window.innerHeight * 100;
		// const zoomR = Math.max(rezoomW, reZoomH) / 1.3;
		// const zoomR = Math.min(rezoomW, reZoomH);
		zoomN = Math.min(zoomW, zoomH);
		// if (zoomN > zoomR) zoomN = zoomR;
	}
	const device = GetDevice();
	return device?110: zoomN;
}
