import React from 'react';

import imgGuideVideo from '../assets/video/guide_video.png';
import videoGuide from '../assets/video/guide-video.mp4';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';

export default class GuideVideoModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {guideVideoModal:props.guideVideoModal, guideVideoInner:props.guideVideoInner};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.guideVideoModal !== nextProps.guideVideoModal) {
			this.setState({guideVideoModal:nextProps.guideVideoModal});
		}
		if (this.state.guideVideoInner !== nextProps.guideVideoInner) {
			this.setState({guideVideoInner:nextProps.guideVideoInner}, () => {
				const guideVideoDiv = document.getElementById('guideVideo');
				if (this.state.guideVideoInner) guideVideoDiv.play();
				else {guideVideoDiv.pause(); guideVideoDiv.currentTime = 0;}
			});
		}
	}

	render() {
		const {guideVideoModal, guideVideoInner} = this.state;
		return (
			<div className={`guide-modal modal-back ${guideVideoModal?'active':''}`}>
				<div className={`modal-wrapper ${guideVideoInner?'active':''}`}>
					<div className='content'>
                        <video id='guideVideo' src={videoGuide} controls></video>
					</div>
					<div className='close-icon flex' onClick={()=>{
						this.props.closeGuideVideoModal('guideVideoInner')
						setTimeout(() => {
							this.props.closeGuideVideoModal('guideVideoModal')
						}, 500);
					}}><SvgClose></SvgClose></div>
				</div>
			</div>
		);
	}
}
