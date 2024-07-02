
import imgMainInfo from '../assets/images/menu/main-info.svg';
import imgMainExplore from '../assets/images/menu/main-explorer.svg';
import imgMainGuide from '../assets/images/menu/main-guide.svg';
import imgMainGuide1 from '../assets/images/menu/main-guide_1.svg';
import imgMainMedia from '../assets/images/menu/main-media.svg';
import imgMainVideo from '../assets/images/menu/main-video.svg';
import imgSubBalance from '../assets/images/menu/sub-balance.svg';
import imgSubExperience from '../assets/images/menu/sub-experience.svg';
import imgSubProduct from '../assets/images/menu/sub-products.svg';
import imgSubTool from '../assets/images/menu/sub-tools.png';
import imgSubDeck from '../assets/images/menu/sub-promenade.png';
import imgSubRailing from '../assets/images/menu/sub-rail.png';
import imgSubFurniture from '../assets/images/menu/sub-furniture.png';

const toolItem = {key:'tool', img:imgSubTool, label:'Fiberon Ascendant', tooltip:'Find the information you need to succeed'};

export const mainMenuArr = [
	// {key:'info', img:imgMainInfo, label:'Info'},
	{key:'explore', img:imgMainExplore, label:'Self Explore', tooltip:'Discover Fiberon through your own experience'},
	{key:'guide', img:imgMainGuide1, label:'Tours', tooltip:'Let us guide you through the experience'},
	toolItem,
	{key:'media', img:imgMainMedia, label:'PR & Media', tooltip:false},
	// {key:'video', img:imgMainVideo, label:'Pre-Recorded', tooltip:'Engage with a recorded video of the full experience'},
]
const deckModalArr = [
	{key:'promenade', label:'PVC Retreat', type:'scene'},
	{key:'sanctuary', label:'Sanctuary Oasis', type:'modal'},
	{key:'concordia', label:'Concordia Hideaway', type:'modal'},
	{key:'goodlife', label:'Good Life Gathering', type:'modal'},
]

const railModalArr = [
	{key:'promenade', label:'Brio - PVC Retreat', type:'scene'},
	{key:'sanctuary', label:'Brio - Sanctuary Oasis', type:'modal'},
	{key:'concordia', label:'CitySide - Concordia Hideaway', type:'modal'},
	{key:'goodlife', label:'Coutryside - Good Life Gatherings', type:'modal'},
]

const lightModalArr = [
	{key:'promenade', label:'Lighting - Brio', type:'modal'},
	// {key:'concordia', label:'Lighting-CitySide', type:'modal'}
]

const fastenerModalArr = [
	{key:'promenade', label:'Hidden Fasteners - PVC Retreat', type:'scene'},
	{key:'goodlife', label:'Hidden Fasteners - Good Life Gatherings ', type:'modal'},
	{key:'concordia', label:'Starborn Pro Plug - Concordia Hideaway', type:'modal'}
]

export const stickExperienceInfo = [
	{key:'balance', label:'Welcome'},
	{key:'promenade', label:'PVC Decking Retreat'},
	{key:'concordia', label:'Concordia Hideaway'},
	{key:'sanctuary', label:'Sanctuary Oasis'},
	{key:'goodlife', label:'Good Life Gatherings'},
	{key:'cladding', label:'Wildwood Composite Cladding'}
]
const stickFurnitureInfo = [
	{key:'weather', label:'Weatherwood', color:'#75653F', hexVal:0x75653F},
	{key:'cedar', label:'Cedar', color:'#975626', hexVal:0x975626},
	{key:'chocolate', label:'Chocolate', color:'#3A2C1C', hexVal:0x3A2C1C},
	{key:'colonial', label:'Colonial Blue', color:'#2C374A', hexVal:0x2C374A},
	{key:'gray', label:'Gray', color:'#656450', hexVal:0x656450},
	{key:'lagoon', label:'Lagoon', color:'#0C6A76', hexVal:0x0C6A76},
	{key:'seaGlass', label:'Sea Glass', color:'#9FC9B6', hexVal:0x9FC9B6},
	{key:'slate', label:'Slate', color:'#2B281B', hexVal:0x2B281B},
	{key:'white', label:'White', color:'#F5F7E8', hexVal:0xF5F7E8},
	{key:'black', label:'Black', color:'#0E0803', hexVal:0x1B1B1B},
]
const stickRailInfo = [
	{key:'white', label:'Alpine', subLabel:'(Tranquil White)', color:'#DDDDDD', hexVal:0xDDDDDD},
	{key:'brown', label:'Simply Brown', color:'#44261C', hexVal:0x44261C}, // 3B261F-#291B16-54362C, 59-41-84, 38-27-54, 31-22-44, 
	{key:'black', label:'Obsidian', subLabel:'(Serene Black)', color:'#1E1E1E', hexVal:0x1E1E1E},
	{key:'mix', label:'White & Black', color:'#DFDFDF', hexVal:0xDFDFDF},
]
export const stickProductInfo = [
	{key:'decking', label:'Decking', modalInfo:{title:'Which Environment to View Decking', arr:deckModalArr}},
	{key:'railing', label:'Railing', modalInfo:{title:'Which Environment to View Railing', arr:railModalArr}},
	{key:'lighting', label:'Lighting', modalInfo:{title:'Which Environment to View Lighting', arr:lightModalArr}},
	{key:'fastener', label:'Fasteners', modalInfo:{title:'Which Environment to View Fasteners', arr:fastenerModalArr}},
	{key:'cladding', label:'Cladding', sceneKey:'cladding', scenePos:0},
	{key:'furnuture', label:'Furniture', sceneKey:'sanctuary', scenePos:1},
	// {key:'scenix', label:'SCENIX', sceneKey:'goodlife', scenePos:1},
]

const colPromenadeArr = [
	{key:'natural', label:'Natural Reef', color:'#8A5E44', hexVal:0x8A5E44},
	{key:'sandy', label:'Sandy Pier', color:'#77614D', hexVal:0x77614D},
	{key:'russet', label:'Russet Dune', color:'#785B4C', hexVal:0x785B4C},
	{key:'weather', label:'Weathered Cliff', color:'#594D44', hexVal:0x594D44},
	{key:'moonlit', label:'Moonlit Cove', color:'#7D7B7A', hexVal:0x7D7B7A},
	{key:'shad', label:'Shaded Cay', color:'#73695D', hexVal:0x73695D}
]
export const colParamountArr = [
	{key:'brown', label:'Brownstone', color:'#807154', hexVal:0x807154, stepCol:0x997E60}, //706144
	{key:'sand', label:'Sandstone', color:'#7F7361', hexVal:0x7F7361, stepCol:0x868077}, // 868077 8F8371 100-143, 92-131, 79-113
	// {key:'flag', label:'Flagstone', color:'#7B7978', hexVal:0x7B7978, stepCol:0x7B7978}, //0x7D8A93
	{key:'mineral', label:'Mineral', color:'#A0A09D', hexVal:0xA0A09D, stepCol:0xA0A09D},
	{key:'clay', label:'Clay', color:'#997E60', hexVal:0x997E60, stepCol:0x807154},
]
const colSanctuaryArr = [
	{key:'espresso', label:'Espresso', color:'#574436', hexVal:0x574436},
	{key:'latte', label:'Latte', color:'#786E62', hexVal:0x786E62},
	{key:'earlGrey', label:'Earl Grey', color:'#716D67', hexVal:0x716D67},
	{key:'moringa', label:'Moringa', color:'#A26B40', hexVal:0xA26B40},
	{key:'chai', label:'Chai', color:'#ACADAA', hexVal:0xACADAA},
]
export const colConcordiaAstirArr = [
	{key:'mountain', label:'Mountain Ash', color:'#664122', hexVal:'mountain'},
	{key:'praire', label:'Prairie Wheat', color:'#AEA993', hexVal:'praire'},
	{key:'seaside', label:'Seaside Mist', color:'#393E49', hexVal:'seaside'},
]
export const colConcordiaSymmetryArr = [
	{key:'sienna', label:'Warm Sienna', color:'#8B6A47', hexVal:'sienna'}, // 0x8B6A47
	// {key:'cinnabar', label:'Cinnabar', color:'#623F36', hexVal:'cinnabar'}, // 0x623F36
	{key:'umber', label:'Burnt Umber', color:'#573D31', hexVal:'umber'}, // 0x573D31
	{key:'graphite', label:'Graphite', color:'#574F48', hexVal:'graphite'}, // 0x574F48
]
export const colConcordiaHorizonArr = [
	{key:'ipe', label:'Ipe', color:'#A77F53', hexVal:'ipe'}, // 0xA77F53
	// {key:'rosewood', label:'Rosewood', color:'#5E3C31', hexVal:'rosewood'}, // 0x5E3C31
	// {key:'tudor', label:'Tudor Brown', color:'#6D4D36', hexVal:'tudor'}, // 0x6D4D36
	{key:'castle', label:'Castle Gray', color:'#C4C8CB', hexVal:'castle'}, //9B9EA3 0x8C8C8C
]
const colGoodlifeEscapes = [
	{key:'cabana', label:'Cabana', color:'#A19C90', hexVal:0xA19C90},
	{key:'beach', label:'Beach House', color:'#6B6B6D', hexVal:0x6B6B6D},
	{key:'bungalow', label:'Bungalow', color:'#755B46', hexVal:0x755B46},
	{key:'tuscan', label:'Tuscan Villa', color:'#92714C', hexVal:0x92714C},
]
const colGoodlifeWeekender = [
	{key:'cabin', label:'Cabin', color:'#8A654B', hexVal:0x8A654B},
	{key:'dottage', label:'Cottage', color:'#7A7470', hexVal:0x7A7470},
]
export const colorDeckArr = [
	{key:'promenade', colArr:colPromenadeArr},
	{key:'paramount', colArr:colParamountArr},
	{key:'sanctuary', colArr:colSanctuaryArr},
	{key:'conSubDeckAstir', colArr:colConcordiaAstirArr},
	{key:'conSubDeckSymmetry', colArr:colConcordiaSymmetryArr},
	{key:'conSubDeckHorizon', colArr:colConcordiaHorizonArr},
	{key:'goodSubDeckEscapes', colArr:colGoodlifeEscapes},
	{key:'goodSubDeckWeekender', colArr:colGoodlifeWeekender},
]

export const subMenuArr = [
	{key:'info', img:imgMainInfo, label:'Info', tooltip:'Information on using the virtual experience'},
	{key:'balance', img:imgSubBalance, label:'Welcome', tooltip:'Welcome to 2023 Fiberon Virtual Experience.'},
	{key:'experience', img:imgSubExperience, label:'Experience', tooltip:'Immerse yourself in your future backyard.', stickInfo:stickExperienceInfo},
	{key:'product', img:imgSubProduct, label:'Products', tooltip:'Browse our products by category.', stickInfo:stickProductInfo},
	toolItem,
	// {key:'deck', img:imgSubDeck, label:'Decking', stickInfo:stickParamountInfo, sceneArr:['promenade'], scenePos:1},
	{key:'deck', img:imgSubDeck, label:'Decking', tooltip:'Choose your color', stickInfo:colPromenadeArr, sceneArr:['concordia', 'promenade', 'goodlife', 'sanctuary']},
	{key:'rail', img:imgSubRailing, label:'Railing', tooltip:'Choose your color', stickInfo:stickRailInfo, sceneArr:['promenade', 'goodlife', 'sanctuary']},
	{key:'furniture', img:imgSubFurniture, label:'Furniture', tooltip:'Choose your color', stickInfo:stickFurnitureInfo, sceneArr:['sanctuary']},
]

export const galleryLabels = [
	{imgId:'fiberon_164233570061e40dd45d673.jpg', label:'Weathered Cliff'},
	{imgId:'fiberon_164233568161e40dc181e42.jpg', label:'Shaded Cay'},
	{imgId:'fiberon_164233562161e40d854483b.jpg', label:'Sandy Pier'},
	{imgId:'fiberon_164233565761e40da93af16.jpg', label:'Russet Dune'},
	{imgId:'fiberon_164233559761e40d6d9b9dd.jpg', label:'Natural Reef'},
	{imgId:'fiberon_164233551961e40d1f51aa7.jpg', label:'Moonlit Cove'},

	{imgId:'fiberon_164233640961e410993d3ce.jpg', label:'Clay'},
	{imgId:'fiberon_164233644261e410ba1ecd9.jpg', label:'Sandstone'},
	{imgId:'fiberon_164233642361e410a710c7d.jpg', label:'Mineral'},
	{imgId:'fiberon_164233639661e4108c42350.jpg', label:'Brownstone'},

	{imgId:'fiberon_164233728361e4140335739.jpg', label:'Horizon Collection - Tudor Brown'},
	{imgId:'fiberon_164233732761e4142f9991b.jpg', label:'Horizon Collection - Rosewood'},
	{imgId:'fiberon_164233731361e414218ebf0.jpg', label:'Horizon Collection - Ipe'},
	{imgId:'fiberon_164233730261e4141621fd4.jpg', label:'Horizon Collection - Castle Gray'},
	{imgId:'fiberon_164233725061e413e214556.jpg', label:'Symmetry Collection - Warm Sienna'},
	{imgId:'fiberon_164233722561e413c94c3f2.jpg', label:'Symmetry Collection - Graphite'},
	{imgId:'fiberon_164233720161e413b122948.jpg', label:'Symmetry Collection - Cinnabar'},
	{imgId:'fiberon_164233718261e4139eaa46b.jpg', label:'Symmetry Collection - Burnt Umber'},

	{imgId:'fiberon_164197981161de9fa345618.jpg', label:'Weekender Collection - Cottage'},
	{imgId:'fiberon_164197979961de9f97efc3d.jpg', label:'Weekender Collection - Cabin'},
	{imgId:'fiberon_164197978461de9f88a28be.jpg', label:'Escapes Collection - Tuscan Villa'},
	{imgId:'fiberon_164197977061de9f7a618c1.jpg', label:'Escapes Collection - Bungalow'},
	{imgId:'fiberon_164197975561de9f6b1301b.jpg', label:'Escapes Collection - Beach House'},
	{imgId:'fiberon_164197974261de9f5ee920f.jpg', label:'Escapes Collection - Cabana'},

	{imgId:'fiberon_164233934961e41c150e45a.jpg', label:'Moringa'},
	{imgId:'fiberon_164233930161e41be54a7da.jpg', label:'Earl Grey'},
	{imgId:'fiberon_164233931861e41bf6c6e05.jpg', label:'Espresso'},
	{imgId:'fiberon_164233933661e41c081c404.jpg', label:'Latte'},
	{imgId:'fiberon_164233928561e41bd5f0ebe.jpg', label:'Chai'},

	{imgId:'fiberon_164155933361d835257818a.jpg', label:'Fiberon Furniture by Breezesta'},
	{imgId:'fiberon_164156007661d8380c0ff70.jpg', label:'Fiberon Furniture by Breezesta'},
	{imgId:'fiberon_164156009061d8381a2528c.jpg', label:'Fiberon Furniture by Breezesta'},
	{imgId:'fiberon_164156010961d8382d4a7a1.jpg', label:'Fiberon Lighting'},
	{imgId:'fiberon_164156013261d83844af8f2.jpg', label:'Fiberon Lighting'},
	{imgId:'fiberon_164156016061d838605b470.jpg', label:'Fiberon Lighting - Smart Home Adapter'},
	{imgId:'fiberon_164198417061deb0aae8733.jpg', label:'Wildwood Composite Cladding - Eden Collection in Tupelo'},
	{imgId:'fiberon_164198420761deb0cf88386.jpg', label:'Wildwood Composite Cladding - Sahra Collection in Sumac and Palo'},
	{imgId:'fiberon_164155924761d834cf87e3c.png', label:'Paramounct PVC Decking -  Clay'},
	{imgId:'fiberon_164155926861d834e4b3234.jpg', label:'Paramount PVC Decking -  Mineral'},
	{imgId:'fiberon_164155928261d834f201787.jpg', label:'Paramount PVC Decking -  Mineral'},
	{imgId:'fiberon_164155929461d834fe06612.jpg', label:'Promenade PVC Decking - Natural Reef'},
	{imgId:'fiberon_164155931161d8350f0d86d.jpg', label:'Promenade PVC Decking -  Weathered Cliff'},
	
]

export const mobileMain = [
	{key:'explore', img:imgMainExplore, label:'Self Explore'},
	{key:'guide', img:imgMainGuide1, label:'Tours'},
	toolItem,
	// {key:'media', img:imgMainMedia, label:'PR & Media'},
	{key:'info', img:imgMainInfo, label:'Info'},
]

export const mobileRightMain = [
	{key:'balance', label:'Balance'},
	{key:'experience', label:'Experience'},
	{key:'product', label:'Products'},
	// {key:'tool', label:'Tools & Support'},
]

export const mobileLeftMain = [
	{key:'deck', label:'Decking', colArr:colPromenadeArr, sceneArr:['concordia', 'promenade', 'goodlife', 'sanctuary']},
	{key:'rail', label:'Railing', colArr:stickRailInfo, sceneArr:['promenade', 'goodlife', 'sanctuary']},
	{key:'furniture', label:'Furniture', colArr:stickFurnitureInfo, sceneArr:['sanctuary']},
]
