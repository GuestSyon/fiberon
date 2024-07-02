import { colConcordiaAstirArr, colConcordiaHorizonArr, colConcordiaSymmetryArr } from "./menuInfo";
function GetConDeckKeyArr () {
	const keyArr = [];
	[colConcordiaAstirArr, colConcordiaHorizonArr, colConcordiaSymmetryArr].forEach(partArr => {
		partArr.forEach(part => { keyArr.push(part.key); });
	});
	return keyArr;
}
const conDeckKeyArr = GetConDeckKeyArr();

export const initPlaneMetal = 0.3;

export const modelArr = [
	{
		key: 'concordia', modelSrc:'concordia', backImg:'concordia-back_0', apiId: 10, apiKey:'Concordia Hideaway', panoType:true,
		backRot: 0, hotPosY0:0,
		campos: [
			{ x: 0.0215, y: 0.00191, z: -0.0082, fov:45, backImg:'concordia-back_0' },
			{ x: 0.0228, y: 0.00191, z: -0.0002, fov:60, backImg:'concordia-back_1' },
		],
		control:[
			{azimuth:{max:2.18, min:1.52}, polar:{max:2.2, min:0.8}},
			{azimuth:{max:2.52, min:0.59}, polar:{max:2.2, min:0.8}},
		],
		deckInfo:conDeckKeyArr,
	}, {
		key: 'goodlife', modelSrc:'good-life', backImg:'good-life-back', apiId:12, apiKey:'Good Life Gatherings',
		backRot: 1.5, hotPosY0:-0.656, topLight:{x:-1, y:3, z:1, int:1},
		campos: [{ x: 0.0365, y: 0.0177, z: -0.03, fov:60 }, { x: 0.0246, y: 0.008, z: 0.0329, fov:60 }],
		control:[
			{azimuth:{max:2.67883, min:1.5}, polar:{max:1.8, min:0.7}},
			{azimuth:{max:2.5, min:0.6}, polar:{max:1.8, min:0.7}},
		],
	}, {
		key: 'promenade', modelSrc:'promenade', backImg:'promenade-back', apiId: 8, apiKey:'PVC Decking Retreat', // 
		backRot: 0.3, hotPosY0:-0.89, topLight:{x:-0.5, y:3, z:-1.5, int:0.7}, // {x:-1, y:3, z:-1, int:1.2}
		backCol:{r:1, g:0.85, b:0.7}, topCol:{r:1, g:0.8, b:0.6, int:0.9},
		campos: [
			{ x: 0.015, y: 0.02, z: 0.131, fov:45 },
			{ x: 0.015, y: 0.02, z: 0.131, fov:45 }
		],
		control:[
			{azimuth:{max:0.5, min:-0.45}, polar:{max:1.654, min:0.9865}},
			{azimuth:{max:0.5, min:-0.7}, polar:{max:1.654, min:0.8}, fire:{x : 0.37, y : -0.21, z : -0.565, rot:Math.PI/2, sclX:0.24, sclY:0.06}}
		],
	}, {
		key: 'sanctuary', modelSrc:'sanctuary', backImg:'sanctuary-back', apiId: 9, apiKey:'Sanctuary Oasis',
		backRot: 3.85, hotPosY0:-0.65, topLight:{x:-2, y:3, z:-1.5, int:0.6}, // 1.1
		campos: [
			{ x: -0.019, y: 0.00626, z: 0.002, fov:52},
			{ x: 0.000088, y: 0.00593, z: -0.01923, fov:52}
		],
		control:[
			{azimuth:{max:-0.5, min:-2.3}, polar:{max:1.29, min:1}},
			{azimuth:{max:-1.8, min:2.1}, polar:{max:1.3416, min:1}},
		],
	}, {
		key: 'balance', modelSrc:'balance_panorama', backImg:'balance-back_1', apiId: 4, apiKey:'Welcome', panoType:true,
		backRot: 0, hotPosY0:0,
		campos: [
			{x: 0.13776, y: 0.010174, z: 0.14365, fov:45, backImg:'balance-back_1'},
			{x: 0.2376, y: 0.06, z: -0.0085, fov:45, backImg:'balance-back_0'},
		],
		control:[
			{azimuth:{max:1.56, min:-0.13}, polar:{max:1.7, min:0.8}, fire:{x : -28.8, y : -4.1, z : 1.8, rot:Math.PI*0.6, sclX:3.3, sclY:1.4}},
			{azimuth:{max:Infinity, min:-Infinity}, polar:{max:1.7, min:0.8}, fire:{x : 19.62, y : -3.65, z : 20.1, rot:0, sclX:2.7, sclY:0.75}},
		],
	}, {
		key: 'cladding', modelSrc:'cladding', backImg:'cladding-back_0', apiId: 5, apiKey:'Wildwood Composite Cladding',
		backRot: 0, hotPosY0:0,
		campos: [
			{x: 0.1, y: 0.0, z: 0.0, fov:60},
		],
		control:[
			{azimuth:{max:1.9, min:1.2}, polar:{max:1.7, min:0.8}},
		],
	},
]

export const areaAPIInfo = [
	{id: 1, name: "Choose Your Journey", section_id: 0},
	{id: 2, name: "Welcome Area", section_id: 1},
	{id: 3, name: "Promenade/Paramount", section_id: 8},
	{id: 4, name: "Concordia", section_id: 10},
	{id: 5, name: "Good Life", section_id: 12},
	{id: 6, name: "Sanctuary", section_id: 9},
	{id: 7, name: "Fiberon Ascendant", section_id: 7},
	{id: 8, name: "Balance/Cladding", section_id: 4},
	{id: 9, name: "Wildwood Composite Cladding", section_id: 5},
]

export const hideHotspotLinks = [
	{key:'balanceBottom', url:'https://fypon.com/collections/beam-mantels'},
	{key:'balanceTop', url:'https://fypon.com/collections/beams'},
	{key:'sanctuaryDoor', url:'https://thermatru2023.thetunagroup.com/'},
	{key:'sanctuaryTable', url:'https://www.fiberondecking.com/products/furniture'},
	{key:'concordiaDoor', url:'https://www.thermatru.com/'},
	{key:'concordiaWindow', url:'https://fypon.com/pages/window-and-door-trim'},
	{key:'sanctuaryColumn', url:'https://fypon.com/pages/column-wraps'},
	{key:'balanceDoor', url:'https://www.thermatru.com/'},
]
export const modelColArr = [
	{key: 'promenade', promenade:0x514A41, rail:0xDDDDDD, paramount:0x6B5843, step:0x5A4F3B}, // 5E6166
	{key: 'sanctuary', deck:0x5F4E44, rail:0xDFDFDF, furniture:0x19202D}, // 272E38 151821 1B222F BBBBBB
	{key: 'balance', rail:0xDDDDDD},
	{key: 'concordia', deck:'mountain', rail:0x1E1E1E, deckPano:true}, // 0x4B3624 , 3B414F, 343948 2B313F
	{key: 'goodlife', deck:0xA19C90, rail:0x1E1E1E} // 806655(554940) , 3B414F #705645
]
export const menuColArr = [
	{key: 'promenade', promenade:0x73695D, rail:0xDDDDDD, paramount:0x997E60, step:0x5A4F3B}, // 5E6166
	{key: 'sanctuary', deck:0x5F4E44, rail:0xDFDFDF, furniture:0x19202D}, // 272E38 151821 1B222F BBBBBB
	{key: 'balance', rail:0xDDDDDD},
	{key: 'concordia', deck:'mountain', rail:0x1E1E1E}, // 0x4B3624 , 3B414F, 343948 2B313F
	{key: 'goodlife', deck:0xA19C90, rail:0x1E1E1E} // 806655(554940) , 3B414F #705645
]

