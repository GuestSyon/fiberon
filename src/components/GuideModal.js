import React from 'react';

// import imgGuideExplore from '../assets/images/menu/main-guide.svg';
import imgGuideTour from '../assets/images/menu/main-guide_1.svg';
import imgGuideVideo from '../assets/images/menu/main-video.svg';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';

const guideArr = [
	// {key:'explore', title:'Guided Explore', img:imgGuideExplore, label:'A representative will guide you through the Environment'},
	{key:'tour', title:'Guided Tour', img:imgGuideTour, label:'You will be set on a dedicated path through the environment'},
	// {key:'video', title:'Pre-Recorded', img:imgGuideVideo, label:'A video will be displayed showing the environment'},
]

export default class GuideModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {guideModal:props.guideModal, guideInner:props.guideInner};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.guideModal !== nextProps.guideModal) {
			this.setState({guideModal:nextProps.guideModal});
		}
		if (this.state.guideInner !== nextProps.guideInner) {
			this.setState({guideInner:nextProps.guideInner});
		}
	}

	onCloseModal = (guideType) => {
		this.props.closeGuideModal('guideInner');
		setTimeout(() => {
			this.props.closeGuideModal('guideModal');
			setTimeout(() => {
				this.props.setGuideType(guideType);
			}, 0);
		}, 500);
	}

	render() {
		const {guideModal, guideInner} = this.state;
		return (
			<div className={`guide-modal modal-back ${guideModal?'active':''}`}>
				<div className={`modal-wrapper ${guideInner?'active':''}`}>
					{/* <div className='modal-title'>Please Select Your Tour</div> */}
					<div className='content flex'>
						{guideArr.map((item, idx )=>
							<div className={`guide-item`} key={idx} onClick={()=>{
									if (item.key==='tour') this.onCloseModal(item.key);
									else this.props.openObjectModal({title:'Pre-recorded video', data:[{type:'video', url:'https://vimeo.com/671431968'}]});
								}}>
								<div className='guide-image-wrapper flex'><div className='guide-image flex'><img src={item.img}></img></div></div>
								<div className='guide-title'>{item.title}</div>
								<div className='guide-label'>{item.label}</div>
							</div>
						)}
					</div>
					<div className='close-icon flex' onClick={()=>this.onCloseModal()}><SvgClose></SvgClose></div>
				</div>
			</div>
		);
	}
}
