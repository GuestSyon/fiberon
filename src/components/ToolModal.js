import React from 'react';
import axios from 'axios';
import { baseUrl, prodUrl } from '../data/config';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';
import {ReactComponent as SvgHeart} from '../assets/images/tools/heart.svg';
import Vimeo from '@u-wave/react-vimeo';
import { DownloadFile } from '../data/model';
import { areaAPIInfo, modelArr } from '../data/constant';
import { toolsSectionArr } from '../data/modalData';
var FileSaver = require('file-saver');
const imgUrlStr = '';// baseUrl+'/storage/';

export default class ToolModalComponent extends React.Component {
	constructor(props) {
		super(props);
		const {selObject, wishlists, zoom} = props;
		this.state = {selObject, wishlists, zoom};
	}

	componentDidMount() {
		this.setModalInfo();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.selObject !== nextProps.selObject) {
			this.setState({selObject:nextProps.selObject}, () => {
				this.checkHeartClass();
				this.setModalInfo();
			});
		}
		if (this.state.wishlists !== nextProps.wishlists) {
			this.setState({wishlists:nextProps.wishlists}, () => this.checkHeartClass());
		}
		if (this.state.objectInner !== nextProps.objectInner) {
			this.setState({objectInner:nextProps.objectInner}, () => {
				if (!this.state.objectInner && this.state.type==='video') {
					this.callAnalyticsAPI(this.state.selObject, 0);
				} 
			});
		}
		if (this.state.zoom !== nextProps.zoom) {
			this.setState({zoom:nextProps.zoom});
		}
	}

	checkHeartClass = () => {
		const {wishlists, selObject} = this.state;
		if (!selObject) return;
		const checkWishlist = wishlists.find(item=>item.section_id===selObject.id)
		this.setState({heart:checkWishlist?'active':''});
	}

	setModalInfo = () => {
		const {selObject} = this.state;
		this.imgUrlArr = [];
		var type, pdf, url, imgSrc, name;
		if (this.oldObject !== selObject) {
			if (this.oldObject && this.oldObject.type==='video') this.callAnalyticsAPI(this.oldObject, 0);
		}
		if (selObject) {
			type = selObject.type; pdf = selObject.pdf; url = selObject.url; imgSrc = selObject.image;
			name = (selObject.name.toLowerCase()==='video')?selObject.display_name : selObject.name;
			if (type === 'images') {
				this.imgUrlArr = selObject.images;
				this.labelArr = selObject.labels;
				// this.callAnalyticsAPI(selObject, 0);
			}
			else if (type==='video') this.callAnalyticsAPI(selObject, 1);
			else if (type==='pdf') this.callAnalyticsAPI(selObject, 0);
		}
		this.oldObject = selObject?{...selObject}:undefined;
		this.setState({type, pdf, url, imgSrc, heart:false, selImgIdx:0, download:selObject.download});
		this.props.setObjType(type, name);
	}

	callAnalyticsAPI = (object, is_entered) => {
		const {apiDevice, userInfo, selScene, modalTitle, toolId} = this.props;
		var section_id = modalTitle;
		const modelInfo = modelArr.find(item=>item.key===selScene);
		if (toolId) {
			const sectionInfo = toolsSectionArr.find(section=>section.id===toolId);
			section_id = sectionInfo.name;
			console.log(section_id);
		}
 		const reqData = {user_id:userInfo.id, mainSection:modelInfo.apiKey, page:object.name, section_id, type:object.type, is_entered, device_type:apiDevice};
		axios.post(baseUrl+"/api/analytics/post", reqData).then((res) => {  });
	}

	downloadFile = (fileUrl, type) => {
		axios.get(fileUrl, { responseType: 'blob'}).then((res) => {
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileUrl.substring(fileUrl.lastIndexOf('/')+1));
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			// this.callAnalyticsAPI(this.props.selObject, 0);
		});
	}

	onClickDownload = () => {
		const {type} = this.props.selObject;
		if (type === 'pdf' || type === 'images') {
			var url;
			if (type === 'pdf') url = this.props.selObject.pdf;
			else if (type === 'images') url = this.imgUrlArr[this.state.selImgIdx];
			const title_arr = url.split("/");
			const title = title_arr[title_arr.length - 1];
			FileSaver.saveAs(url, title);
			// const preType = type==='pdf'?type:'image';
			// this.callAnalyticsAPI(this.props.selObject, 0);
		}
	}

	getImgClass = (idx) => {
		return this.props.selObject.name === "Logo Content" && idx < 2 ? 'black':'';
	}

	render() {
		const {type, pdf, url, heart, selImgIdx, selObject, imgSrc, download, imgLabelInfo, zoom} = this.state;
		const {device} = this.props;
		return (
			<div className={`tool-modal-wrapper ${this.props.modalType}-page flex scroll scroll-y ${type?'active':''}`} style={{height:(this.props.contentH+10)+'px'}}>
				{this.props.modalType==='tv' &&
					<>
						<div className='close-icon flex' onClick={ this.props.closeToolModal}><SvgClose></SvgClose></div>
						<div className='top-bar'>
							<SvgHeart className={`heart ${heart?'active':''}`} onClick={()=>this.props.changeWishlist(selObject.id)}></SvgHeart>
							<div className='button download' onClick={this.onClickDownload}>Download</div>
						</div>
					</>
				}
				{type === 'pdf' &&
					<div className='pdf-content'>
						<iframe src={pdf} width='100%' height={this.props.contentH-10}></iframe>
					</div>
				}
				{type === 'images' &&
					<div className='image-content' style={{height:this.props.contentH+'px'}}>
						<div className={`main-image flex ${imgLabelInfo?'with-label':''}`}>
							<img className={this.getImgClass(selImgIdx)} src={imgUrlStr+this.imgUrlArr[selImgIdx]}></img>
							{imgLabelInfo && <div className='img-label' style={{transform:`scale(${100/(zoom - 10)})`}}>{imgLabelInfo}</div>}
						</div>
						<div className='tumb-wrapper scroll scroll-x'>
							<div className='tumb-inner' style={{width:this.imgUrlArr.length*(device?92:92 )+'px'}}>
								{this.imgUrlArr.map((imgUrl, idx )=>
									<div className={`tumb-img flex ${idx===selImgIdx?'active':''}`} onClick={()=>{
										const imgLabelInfo = (this.labelArr && this.labelArr[idx] && typeof this.labelArr[idx] === 'string') ? this.labelArr[idx]:null;
										this.setState({selImgIdx:idx, imgLabelInfo});
									}} key={idx}>
										<img className={this.getImgClass(idx)} src={imgUrlStr+imgUrl}></img>
									</div>
								)}
							</div>
						</div>
						{download && <div className='button download' onClick={()=>this.downloadFile(imgUrlStr+this.imgUrlArr[selImgIdx], 'image')}>Download</div> }
					</div>
				}
				{type === 'image' &&
					<div className='image-content single-image flex' style={{height:this.props.contentH+'px'}}>
						<img className={this.getImgClass(selImgIdx)} src={imgSrc}></img>
					</div>
				}
				{type === 'video' &&
					<div className='video-content flex'>
						<Vimeo video={url} autoplay controls height={this.props.contentH}></Vimeo>
					</div>
				}
				{type === 'balance' &&
					<div className='image-content'>
						<div className='main-image'>
							<img src={url}></img>
						</div>
					</div>
				}
				{type === 'frame' &&
					<div className='pdf-content'>
						<iframe src={url} width='100%' height={this.props.contentH-10}></iframe>
					</div>
				}
			</div>
		);
	}
}
