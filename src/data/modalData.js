
import imgTVMedia from '../assets/images/tools/PRMedia.jpg';
import imgTVResource from '../assets/images/tools/Resources.jpg';
import imgTVEducation from '../assets/images/tools/Ascendant.jpg';
import imgBalanceWood from '../assets/images/canvas/custom_wood.svg';
import imgBalanceWaste from '../assets/images/canvas/custom_waste.svg';
import imgBalancePlastic from '../assets/images/canvas/custom_plastic.svg';
import imgBalanceWater from '../assets/images/canvas/custom_water.svg';
// case 165: urlStr = "./modelView.html?BrioRhythm_railingRebuild_04_coloredScrews"; break; // P biorhythm 
// case 166: urlStr = "./modelView.html?NaturalReef_3foot_GLB_17_fixedStreaks"; break; // P promenade
// case 168: urlStr = "./modelView.html?EarlGray_3foot_GLB_15_newShape"; break; // S sanctuary
// case 169: urlStr = "./modelView.html?BrioRhythm_railingRebuild_04_coloredScrews"; break; // S biorhythm
// case 173: urlStr = "./modelView.html?CitySide_railingRebuild_05_coloredScrews"; break; // C havenView
// case 284: urlStr = "./modelView.html?ConcordiaGraphite_GLB_v03"; break; // C concordia
// case 176: urlStr = "./modelView.html?GoodLifeCabana_GLB_121420"; break; // G goodLife
// case 168: urlStr = "./modelView.html?CountrySide_railingRebuild_05_coloredScrews"; break; // G havenView

function getGalleryArr(num) {
	const strArr = [];
	for (let i = 0; i <= num; i++) {
		strArr.push('image'+i);
	}
	return strArr;
}

const pre360Url = 'https://ss-test.rungra888.com/';

const infoCaldding = [
	{name:'Wildwood', type:'video', url:'https://vimeo.com/656536527'},
	{name:'Product Specific', type:'video', url:'https://vimeo.com/656536956'},
	{name:'Installation', type:'video', url:'https://vimeo.com/656536844'},
	{name:'Brochure', type:'pdf'},
	{name:'Download', type:'download', fileName:'Submittal_Package.zip'},
	{name:'Gallery', type:'images', images:getGalleryArr(7)},
	{name:'Favorite', type:'favorite'},
];

const infoCitySide = [
	{name:'Video', type:'video', url:'https://vimeo.com/663974365'},
	{name:'Sell Sheet', type:'pdf'},
	// {name:'CitySide Railing Lighting Brochure', type:'pdf'},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?CitySide_railingRebuild_05_coloredScrews'},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/collections/cityside-railing/products/cityside-railing?variant=42387180421309'},
	{name:'Favorite', type:'favorite'},
];

const infoConcordia = [
	{name:'Video', type:'video', url:'https://vimeo.com/794427808'}, // 787867182
	{name:'Sell Sheet', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(15), labels:[0, 1, 2, 3, 4, 5, 6, 7, 'Astir Collection - Mountain Ash', 'Astir Collection - Prairie Wheat', 'Astir Collection - Seaside Mist', 'Symmetry Collection - Burnt Umber', 'Symmetry Collection - Graphite', 'Symmetry Collection - Warm Sienna', 'Horizon Collection - Castle Gray', 'Horizon Collection - Ipe']},
	// {name:'Astir Video', type:'video', url:'https://vimeo.com/783913044'},
	// {name:'Astir Sell Sheet', type:'pdf'},
	// {name:'Astir Collection Gallery', type:'images', images:getGalleryArr(0)},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/products/concordia-decking?variant=42129481728189'},
	{name:'Favorite', type:'favorite'},
];

const infoFiberonWild = [
	{name:'Sell Sheet', type:'pdf'},
	{name:'Inspiration Gallery', type:'images', images:getGalleryArr(21)},
	{name:'Sample', type:'url', url:'https://www.fiberoncladding.com/pages/request-a-sample'},
	{name:'Favorite', type:'favorite'},
];

const infoFiberon = [
	{name:'Video', type:'video', url:'https://vimeo.com/664282174'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Furniture Brochure', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(5)},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?fiberon-furniture'},
	{name:'Buy Now', type:'url', url:'https://www.fiberondecking.com/pages/furniture'},
	{name:'Favorite', type:'favorite'},
];

const infoLighting = [
	{name:'Smart Technology Video', type:'video', url:'https://vimeo.com/670285058'},
	{name:'Overview Video', type:'video', url:'https://vimeo.com/502043376'},
	{name:'Sell Sheet', type:'pdf'},
	// {name:'Railing Lighting Brochure', type:'pdf'},
	{name:'Favorite', type:'favorite'},
	{name:'Buy Now', type:'url', url:'https://www.fiberondecking.com/pages/lighting'},
];

const infoStarborn = [
	{name:'Sell Sheet', type:'pdf'},
	{name:'Starborn Color-Matched Screws', type:'pdf'},
	{name:'Favorite', type:'favorite'},
];

const infoCountrySide = [
	{name:'Video', type:'video', url:'https://vimeo.com/664299221'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?countryside-rail'},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/collections/countryside-railing/products/countryside-railing?variant=40996075569341'}, // question
	{name:'Favorite', type:'favorite'},
];

const infoGoodLife = [
	{name:'Decking Video', type:'video', url:'https://vimeo.com/502076751'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(11), labels:[0, 1, 2, 3, 4, 5, 'Escapes Collection - Cabana', 'Escapes Collection - Beach House', 'Escapes Collection - Bungalow', 'Escapes Collection - Tuscan Villa', 'Weekender Collection - Cabin', 'Weekender Collection - Cottage']},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?GoodLifeCabana_GLB_121420'},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/collections/good-life-decking/products/good-life-decking?variant=40996040212669'},
	{name:'Favorite', type:'favorite'},
];

const infoHiddenFastener = [
	{name:'Fiberon EDGE', type:'video', url:'https://vimeo.com/796921262'},
	{name:'Fiberon STARTER', type:'video', url:'https://vimeo.com/796919094'},
	{name:'Fiberon EDGEX / EDGEXMETAL', type:'video', url:'https://vimeo.com/797208787'},
	// {name:'CAMO Tools', type:'video', url:'https://vimeo.com/781080725'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Buy Now', type:'url', url:'https://www.fiberondecking.com/pages/deck-fasteners'},
	{name:'Favorite', type:'favorite'},
];

const infoScenix = [
	{name:'Video', type:'video', url:'https://vimeo.com/664390956'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(23)},
	{name:'How to measure Video', type:'video', url:'https://vimeo.com/664390832'},
	{name:'How to install Video', type:'video', url:'https://vimeo.com/664390486'},
	{name:'Technical PDF', type:'pdf'},
	{name:'Scenix PDF', type:'pdf'},
	{name:'Favorite', type:'favorite'},
];

const infoPromenade = [
	{name:'Video', type:'video', url:'https://vimeo.com/502035252'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(11), labels:[0,1,2,3,4,5, 'Moonlit Cove','Natural Reef', 'Sandy Pier', 'Russet Dune', 'Shaded Cay', 'Weathered Cliff']},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?NaturalReef_3foot_GLB_17_fixedStreaks'},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/products/promenade-decking?variant=41050963345597'},
	{name:'Favorite', type:'favorite'},
];

const infoParamount = [
	{name:'Video', type:'video', url:'https://vimeo.com/776170758'},
	// {name:'Product Manager Video', type:'video', url:'https://vimeo.com/778789746'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(8), labels:[0, 1, 2, 3, 4, 'Hearth Collection - Brownstone', 'Hearth Collection - Sandstone', 'Mantel Collection - Clay', 'Mantel Collection - Mineral']},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?paramount'},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/products/paramount-decking?variant=40996040736957'},
	{name:'Favorite', type:'favorite'},
];

const infoBrioRailing = [
	{name:'Video', type:'video', url:'https://vimeo.com/663951376'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Railing Lighting Take Off Sheet', type:'pdf'},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?BrioRhythm_railingRebuild_04_coloredScrews'},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/products/brio-railing?variant=40996074684605'},
	{name:'Favorite', type:'favorite'},
];

const infoSanctuary = [
	{name:'Video', type:'video', url:'https://vimeo.com/502048699'},
	{name:'Sell Sheet', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(11), labels:[0, 1, 2, 3, 4, 5, 6, 'Chai', 'Earl Grey', 'Espresso', 'Latte', 'Moringa']},
	{name:'360 View', type:'frame', url:pre360Url+'/modelView.html?EarlGray_3foot_GLB_15_newShape'},
	{name:'Sample', type:'url', url:'https://www.fiberondecking.com/products/sanctuary-decking?variant=40996041588925'},
	{name:'Favorite', type:'favorite'},
];

const infoCommercialCladding = [
	{name:'Wildwood Video', type:'video', url:'https://vimeo.com/788527287'}, // 775795650
	{name:'Installation Video', type:'video', url:'https://vimeo.com/788526261'},
	{name:'Wildwood Tri-Fold', type:'pdf'},
	{name:'Wildwood Brochure', type:'pdf'},
	{name:'Balance Tri-Fold', type:'pdf'},
	{name:'Gallery', type:'images', images:getGalleryArr(21)},
	{name:'Sample', type:'url', url:'https://www.fiberoncladding.com/pages/request-a-sample'},
	{name:'Case Study', type:'pdf'},
	{name:'Favorite', type:'favorite'},
	{name:'Download Specs', type:'download', fileName:'Spec_Package.zip'},
]

const infoYellow = [
	{name:'Fiberon Yellowstone Press Release', type:'pdf'},
	{name:'Yellowstone Image Gallery', type:'images', images:getGalleryArr(9)},
	{name:'Yellowstone Forever', type:'url', url:'https://www.yellowstone.org/'},
]

const infoBalance = [
	{name:'Balance Video', type:'video', url:'https://vimeo.com/664692197'},
	{name:'FBHS ESG', type:'pdf'},
	{name:'wood', type:'video', url:'https://vimeo.com/783362038', btnImg:imgBalanceWood, bottomLabel:'We’re saving more than 1 million trees from being cut down every year'},
	{name:'waste', type:'video', url:'https://vimeo.com/783361401', btnImg:imgBalanceWaste, bottomLabel:'We reuse 98.5% of the waste from our manufacturing process'},
	{name:'plastic', type:'video', url:'https://vimeo.com/783361749', btnImg:imgBalancePlastic, bottomLabel:'100 million pounds of recycled plastic put to good use every year'},
	{name:'water', type:'video', url:'https://vimeo.com/783361444', btnImg:imgBalanceWater, bottomLabel:'Manufacturing composite decking requires a constant sources of water.  The good news, we ruse almost all of it'},
]

const natureData = [
	{hotLabel:'Cladding', data:infoCaldding, id:283},

	{hotLabel:'CitySide Railing', data:infoCitySide, id:118},
	{hotLabel:'Concordia', data:infoConcordia, id:56}, // Concordia Decking , rowCount:4
	{hotLabel:'Fiberon Wildwood Cladding', data:infoFiberonWild, id:115},
	{hotLabel:'Fiberon Furniture', data:infoFiberon, id:310},
	{hotLabel:'Lighting', data:infoLighting, id:119},
	{hotLabel:'Starborn Pro Plug', data:infoStarborn, id:114},

	{hotLabel:'CountrySide Railing', data:infoCountrySide, id:58},
	{hotLabel:'Good Life Decking', data:infoGoodLife, id:98},
	{hotLabel:'Hidden Fastener', data:infoHiddenFastener, id:97}, // Hidden Grooved Fastener System
	{hotLabel:'Scenix', data:infoScenix, id:289},

	{hotLabel:'Promenade', data:infoPromenade, id:78},
	{hotLabel:'Paramount', data:infoParamount, id:24},
	// {hotLabel:'Hidden Fastener', data:infoHiddenFastener, id:88},
	// {hotLabel:'Lighting', data:infoLighting, id:19},
	{hotLabel:'Brio Railing', data:infoBrioRailing, id:13},

	{hotLabel:'Sanctuary', data:infoSanctuary, id:55}, // Sanctuary Decking
	// {hotLabel:'Brio Railing', data:infoBrioRailing, id:75},

	{hotLabel:'Fiberon Balance', data:infoBalance, id:100, rowCount:6, bottomLabel:true}, // question
	{hotLabel:'Yellowstone Forever', data:infoYellow, id:99}, // question

	{hotLabel:'Wildwood Composite Cladding', data:infoCommercialCladding, id:285},

	{hotLabel:'Fiberon 25 year celebration', data:[{type:'video', url:'https://vimeo.com/799777319', name:'Fiberon 25 year celebration'}], id:320}, // first video
]

function SetModalUrlItem(item, subUrl) {
	subUrl = subUrl.split(' ').join('_');
	if (item.type === 'pdf') {
		item.pdf = subUrl+'.pdf';
	} else if (item.type==='images') {
		const newArr = [], format = item.name==='Logos'?'.png':'.jpg';
		item.images.forEach(fileName => { newArr.push(subUrl+'/'+fileName+format); });
		item.images = newArr;
	} else if (item.type==='download') {
		item.downloadUrl = subUrl+'.zip';
	}
	return item;
}

function SetModalUrl() {
	natureData.forEach(item => {
		const {hotLabel, data} = item;
		data.forEach(subItem => {
			const subUrl = 'https://s3.amazonaws.com/tuna.fiberon2023/modalData/'+hotLabel+'/'+subItem.name; //https://ss-test.rungra888.com
			subItem = SetModalUrlItem(subItem, subUrl);
		});
	});
	return natureData;
}

export const modalData = SetModalUrl();

const infoAscedant = [
	{name:'Ascendant Platform', type:'url', url:'https://www.fiberondecking.com/pages/fiberon-ascendant'},
	{name:'Ascendant Video', type:'video', url:'https://vimeo.com/792127441'},
	{name:'Ascendant Sell Sheet', type:'pdf'},
	{name:'Certified Installer Brochure', type:'pdf'},
	{name:'Accredited Dealer Sell Sheet', type:'pdf'},
]

const infoReSourceSellSheet = [
	{name:'Fiberon Furniture by Breezesta', type:'pdf'},
	{name:'Hidden Fasteners', type:'pdf'},
	{name:'Starborn Pro Plug', type:'pdf'},
	{name:'Brio Railing', type:'pdf'},
	{name:'Wildwood Composite Cladding', type:'pdf'},
	{name:'Concordia', type:'pdf'},
	{name:'CitySide Railing', type:'pdf'},
	{name:'CountrySide Railing', type:'pdf'},
	{name:'Paramount', type:'pdf'},
	{name:'Promenade', type:'pdf'},
	{name:'Good Life', type:'pdf'},
	{name:'Sanctuary', type:'pdf'},
	{name:'Fiberon Discovery Deck Design Tools', type:'pdf'},
	{name:'Fiberon Lighting', type:'pdf'},
]

const infoResouceWarranty = [
	{name:'Commercial Limited Warranty', type:'pdf'},
	{name:'Residential Limited Warranty', type:'pdf'},
]

const infoReSource = [
	{name:'Sell Sheets', type:'array', data:infoReSourceSellSheet},
	{name:'Warranty', type:'array', data:infoResouceWarranty},
	// {name:'Product Guide', type:'pdf'},
	{name:'Balance Brochure', type:'pdf'},
	{name:'How To Use Digital Vault', type:'pdf'},
	{name:'Ad Planner - Social Portal Flyer', type:'pdf'},
	{name:'Furniture Brochure', type:'pdf'},
	{name:'Wildwood Cladding Brochure', type:'pdf'},
	{name:'Wood v Composite Video', type:'video', url:'https://vimeo.com/663304387'},
	{name:'Deck Designer Video', type:'video', url:'https://vimeo.com/663302373'},
	{name:'Discovery AR App Video', type:'video', url:'https://vimeo.com/663301837'},
]

const infoMediaRelease = [
	// {name:'PVC Water Performance - New Color', type:'pdf'},
	// {name:'Furniture Dealer Program Launch', type:'pdf'},
	// {name:'Lighting Smart Technology', type:'pdf'},
	// {name:'2022 Virtual Experience Announcement', type:'pdf'},
	// {name:'Fiberon Wildwood Composite Cladding', type:'pdf'},
	{name:'2023 New Products / 25 Year Anniversary / Virtual Experience', type:'pdf'},
	{name:'Fiberon Ascendant Platform', type:'pdf'},
	{name:'Wildwood Composite Cladding - New Bamboo Color', type:'pdf'},
]
const infoMediaFlyers = [
	{name:'Fiberon Paramount PVC Decking', type:'pdf'},
	{name:'Fiberon Promenade PVC Decking', type:'pdf'},
	{name:'Fiberon Furniture', type:'pdf'},
	{name:'Fiberon Wildwood Cladding', type:'pdf'},
]
const infoPRMedia = [
	{name:'Press Releases', type:'array', data:infoMediaRelease},
	{name:'New Product Images', type:'images', images:getGalleryArr(5), download:true, labels:[,,,'Concordia - Astir - Mountain Ash', 'Concordia - Astir - Prairie Wheat', 'Concordia - Astir - Seaside Mist']},
	{name:'Logos', type:'images', images:['image0', 'image1'], download:true},
	{name:'Company Background', type:'pdf'},
	{name:'2023 Product Guide', type:'pdf'},
	{name:'Brand Purpose Video', type:'video', url:'https://vimeo.com/499225659'},
]

const natureToolsData = [
	{ id: 40, name: 'Fiberon Ascendant', img: imgTVEducation, data:infoAscedant },
	{ id: 39, name: 'Resources', img: imgTVResource, data:infoReSource },
	{ id: 35, name: 'PR & Media', img: imgTVMedia, data:infoPRMedia },
];

function GetToolsData() {
	natureToolsData.forEach(section => {
		const {name, data} = section;
		data.forEach(item => {
			const subUrl = 'https://s3.amazonaws.com/tuna.fiberon2023/modalData/'+name+'/'+item.name;
			item = SetModalUrlItem(item, subUrl);
			if (item.type==='array') {
				item.data.forEach(subItem => {
					var subName = subItem.name;
					if (subName.includes('/')) {
						subName = subName.split('/').join('slash');
					}
					const biSubUrl = 'https://s3.amazonaws.com/tuna.fiberon2023/modalData/'+name+'/'+item.name+'/'+subName;
					subItem = SetModalUrlItem(subItem, biSubUrl);
				});
			}
		});
	});
	return natureToolsData;
}

export const toolsSectionArr = GetToolsData();