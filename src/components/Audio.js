import React from 'react';
import audioBack from '../assets/audio/forest_day.mp4';

export default class AudioComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pageKey:props.pageKey, speaker:props.speaker };
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey});
		}
		if (this.state.speaker !== nextProps.speaker) {
			this.setState({speaker:nextProps.speaker}, () => {
				const audioBack = document.getElementById("audioBack");
				if (!audioBack) return;
				if (!this.state.speaker) audioBack.pause();
				else audioBack.play();
			});
		}
	}

	render() {
		const {pageKey} = this.state;
		return (
			<audio loop={true} id='audioBack'>
				<source src={audioBack} ></source>
			</audio>
		);
	}
}
