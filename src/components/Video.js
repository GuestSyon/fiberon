import React from 'react';
import jQuery from 'jquery';
import {ReactComponent as SvgSkip} from '../assets/images/welcome/skip.svg';
import {ReactComponent as SvgSpeak} from '../assets/images/menu/left-speak.svg';
import videoFirst from '../assets/video/Welcome.webm';

export default class VideoComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pageKey:props.pageKey, speak:true };
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey});
		}
	}

	onClickSound = () => {
		this.setState({speak:!this.state.speak}, () => {
			jQuery("video").prop('muted', !this.state.speak);
		})
	}

	render() {
		const {pageKey, speak} = this.state;
		return (
			<div className='back-board first-video active'  onEnded={this.props.endFirstVideo}>
				<video autoPlay={true} height={window.innerHeight*0.94} style={{left: window.innerWidth/2-window.innerHeight*0.843378+'px'}}>
					<source src={videoFirst} type="video/webm"></source>
				</video>
				<div className={`first-sound ${speak?'':'mute'}`} onClick={this.onClickSound}>
					<SvgSpeak></SvgSpeak>
				</div>
				{/* <div className='button skip-video' onClick={this.props.endFirstVideo}><SvgSkip></SvgSkip> Skip</div> */}
			</div>
		);
	}
}
