import React from 'react';
import {ReactComponent as SvgSoundMute} from '../assets/images/guide/explore-sound-off.svg';
import {ReactComponent as SvgVideoMute} from '../assets/images/guide/explore-video-off.svg';

export default class GuideExploreComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pageKey:props.pageKey, panActive:false, guideType:props.guideType, disableSound:true, disableVideo:true};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.guideType !== nextProps.guideType) {
			this.setState({guideType:nextProps.guideType}, () => {
				if (this.state.guideType === 'explore') {
					this.setState({panActive:true});
				} else {
					this.setState({panActive:false});
				}
			});
		}
	}

	onClickButton = (type, key) => {
		if (key === 'EXIT') {
			this.setState({panActive:false});
			setTimeout(() => { this.props.closeGuideTour(); }, 400);
		}
	}

	render() {
		const {pageKey, panActive, guideType, disableSound, disableVideo} = this.state;
		return (
			<div className={`back-board guide-explore ${guideType==='explore'?'active':''}`}>
				<div className={`pan-board ${panActive?'active':''}`}>
					<div className='pan-bottom flex'>
						<div className={`pan-icon flex ${disableSound?'disable-sound':''}`} onClick={()=>this.setState({disableSound:!disableSound})}><SvgSoundMute></SvgSoundMute></div>
						<div className={`pan-icon flex ${disableVideo?'disable-video':''}`} onClick={()=>this.setState({disableVideo:!disableVideo})}><SvgVideoMute></SvgVideoMute></div>
					</div>
				</div>
				<div className='pan-button button' onClick={this.props.closeGuideExplore}>End Tour</div>
			</div>
		);
	}
}
