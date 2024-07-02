import React from 'react';
import { voiceUrl } from '../data/config';

export default class VoiceComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selVoice:props.selVoice, speechTxt:'', voice:'Record' };
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.selVoice !== nextProps.selVoice) {
			this.setState({selVoice:nextProps.selVoice}, () => {
				if (this.state.selVoice) {
					fetch(voiceUrl + '/api/speech-to-text/token').then(response => {
						return response.json();
					}).then( token => {
						console.log('tokn from watson',token);
						return;
						// this.stream = WatsonSpeech.SpeechToText.recognizeMicrophone(Object.assign(token, {
						// 	objectMode: true,
						// 	interimResults:true,
						// 	wordConfidence:true,
						// 	smartFormatting:true,
						// }));
						
						// this.stream.on('error', function(err) { console.log(err); });
						// // stream.setEncoding('utf8'); // get text instead of Buffers for on data events
						// this.stream.on('data', (data) => {
						// 	console.log('dt', data)
	
						// 	if(data && data.results[0] && data.results[0].alternatives && data.results[0].final) {
						// 		console.log('final word', data.results[0].alternatives)
						// 		var recStr = data.results[0].alternatives[0].transcript.trim().toLowerCase();
						// 		let str_turn_on = "turn on light"; 
						// 		let str_turn_off = "turn off light"; 

						// 		let on_assumes = ["turn on light", "turn on the light", "turn on", "lights on"];
						// 		let off_assumes = ["turn off light", "turn off the light", "turn off", "lights off"];
						// 		recStr = recStr.toLowerCase();

						// 		recStr = recStr.split(/\s/).join('');

						// 		on_assumes.forEach(item => {
						// 			if(recStr.indexOf(item.split(/\s/).join('')) > -1){
						// 				this.props.setLightMode(true);
						// 			}
						// 		});
	
						// 		off_assumes.forEach(item => {
						// 			if(recStr.indexOf(item.split(/\s/).join('')) > -1){
						// 				this.props.setLightMode(false)
						// 			}
						// 		});
						// 		this.setState({speechTxt:recStr});
						// 	}
						// 	// if(data && data.results[0] && data.results[0].alternatives) {
						// 	// 	var recStr = data.results[0].alternatives[0].transcript.trim().toLowerCase();
						// 	// 	if (!recStr.length || !isNaN(parseInt(recStr)) ) return;
						// 	// 	const length = recStr.length, lastChat = recStr[length - 1];
						// 	// 	if (lastChat === '.') recStr = recStr.substring(0, length-1);
						// 	// 	var {speechTxt} = this.state;
						// 	// 	console.log(recStr, speechTxt);
						// 	// 	if (speechTxt.indexOf(recStr) > -1) return;
						// 	// 	speechTxt += ' ' + recStr;
						// 	// 	const lowerStr = speechTxt.toLocaleLowerCase();
						// 	// 	if (lowerStr.indexOf('day to night') > -1 || lowerStr.indexOf('turn on light') > -1) {
						// 	// 		this.props.setLightMode(true);
						// 	// 	} else if (lowerStr.indexOf('night to day') > -1 || lowerStr.indexOf('turn off light') > -1)
						// 	// 		this.props.setLightMode(false);
						// 	// 	this.setState({speechTxt});
						// 	// }
						// });
					}).catch(function(error) {
						console.log(error);
					});
	
				} else {
					if (this.stream) {
						this.stream.stop();
						this.stream = null;
						this.setState({speechTxt:''})
					}
				}
			});
		}
	}

	onClickVoice = () => {
		this.setState({voice:this.state.voice==='Record'?'Stop':'Record'}, () => {
			const {voice} = this.state;
		})
	}

	render() {
		const {pageKey, speech, voice, speechTxt} = this.state;
		return (
			<div className={`voice`}>
				{/* <div className={`voice-button button`} onClick={this.onClickVoice}>{voice}</div>
				<div className={`speech-text`} >{speechTxt}</div> */}
			</div>
		);
	}
}
