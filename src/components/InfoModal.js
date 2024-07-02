import React from 'react';

import imgMouseSide from '../assets/images/modal/info_mouse_side.png';
import imgMouseFront from '../assets/images/modal/info_mouse_front.png';
import imgSpeaker from '../assets/images/modal/info_speaker.png';
import imgPhone from '../assets/images/modal/info_phone.png';

import {ReactComponent as SvgClose} from '../assets/images/close.svg';

const phoneLabels = [
	'Fiberon Lighting integrates with smart home devices such as Google Home and Amazon Alexa.',
	'In the environments you see the microphone icon, click and hold the icon and say a command below to turn on or off the lighting.',
	'"Hey Google, turn on/off Fiberon Lighting."',
	'"Alexa, turn on/off Fiberon Lighting."',
	// '"Turn lights off" to turn the lights off in the environment'
]

const generalArr = [
	{img:imgMouseSide, label:'Click and drag to the left to move the view left, click and drag to the right to move the view right.'},
	{img:imgMouseFront, label:'Click and drag up to move the view up, click and drag down to move the view down.'},
	{img:imgSpeaker, label:'Click the Icon to toggle sound on or off'},
	{img:imgPhone, label:'Microphone Info', title:true, subLabels:phoneLabels, classStr:'flexStart'}
]

export default class InfoModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {infoModal:props.infoModal, infoInner:props.infoInner};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.infoModal !== nextProps.infoModal) {
			this.setState({infoModal:nextProps.infoModal});
		}
		if (this.state.infoInner !== nextProps.infoInner) {
			this.setState({infoInner:nextProps.infoInner});
		}
	}

	render() {
		const {infoModal, infoInner} = this.state;
		return (
			<div className={`info-modal modal-back ${infoModal?'active':''}`}>
				<div className={`modal-wrapper flex ${infoInner?'active':''}`}>
					<div className='modal-title'>Info</div>
					<div className='content'>
						{generalArr.map((item, idx )=>
							<div className={`info-item ${item.classStr}`} key={idx}>
								<div className={`info-image flex ${item.title?'top':''}`}><img src={item.img}></img></div>
								<div className='info-label'>
									{item.label!==undefined && <div className={`${item.title?'title':'normal-label'}`} >{item.label}</div>}
									{item.subLabels && item.subLabels.map((subLabel, subIdx )=>
										<div className='normal-label sub-label' key={subIdx}>{subLabel}</div>
									)}
								</div>
							</div>
						)}
					</div>
					<div className='close-icon flex' onClick={()=>{
						this.props.closeInfoModal('infoInner')
						setTimeout(() => {
							this.props.closeInfoModal('infoModal')
						}, 500);
					}}><SvgClose></SvgClose></div>
				</div>
			</div>
		);
	}
}
