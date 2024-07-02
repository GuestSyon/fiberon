import React from 'react';

const placeArr = [
	{key:'balance', label:'Ascendant'},
	{key:'promenade', label:'PVC Retreat'},
	{key:'sanctuary', label:'Sanctuary Oasis'},
	{key:'concordia', label:'Concordia Hideaway'},
	{key:'goodlife', label:'Good Life Gatherings'},
	{key:'cladding', label:'Wildwood Cladding'},
];

const stepArr = [
	{sceneName:'balance', scenePos:0},
	{sceneName:'balance', scenePos:1},
	{sceneName:'promenade', scenePos:0},
	{sceneName:'promenade', scenePos:1},
	{sceneName:'sanctuary', scenePos:0},
	{sceneName:'sanctuary', scenePos:1},
	{sceneName:'concordia', scenePos:0},
	{sceneName:'concordia', scenePos:1},
	{sceneName:'goodlife', scenePos:0},
	{sceneName:'goodlife', scenePos:1},
	{sceneName:'cladding', scenePos:0},
];

export default class GuideTourComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { menuActive:false, guideType:props.guideType, stepNum:-1, disableBack:true, disableNext:false};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.guideType !== nextProps.guideType) {
			this.setState({guideType:nextProps.guideType}, () => {
				if (this.state.guideType === 'tour') {
					this.setState({menuActive:true, stepNum:0, disableBack:true, disableNext:false});
				} else {
					this.setState({menuActive:false, stepNum:-1});
				}
			});
		}
	}

	onClickExit = () => {
		this.setState({menuActive:false});
		setTimeout(() => { this.props.closeGuideTour(); }, 400);
	}

	onClickStep = (delta) => {
		const {stepNum} = this.state, targetNum = stepNum + delta;
		if (targetNum < 0 || targetNum >= stepArr.length) return;
		const stepInfo = stepArr[targetNum];
		if (stepInfo.sceneName==='tools') this.props.gotoTool();
		else this.props.gotoStep(stepInfo.sceneName, stepInfo.scenePos);
		this.setState({
			stepNum:targetNum,
			disableBack:targetNum <= 0?true:false,
			disableNext:targetNum >= stepArr.length-1?true:false
		})
	}

	render() {
		const {menuActive, guideType, stepNum, disableBack, disableNext} = this.state;
		return (
			<div className={`back-board guide-tour ${guideType==='tour'?'active':''}`}>
				<div className={`side-menu ${menuActive?'active':''}`}>
					<div className='place-menu'>
						{placeArr.map((placeItem, idx) =>
							<div className={`place-item button ${stepArr[stepNum]&&stepArr[stepNum].sceneName===placeItem.key?'active':''}`} key={idx}>{placeItem.label}</div>
						) }
					</div>
					<div className='control-menu'>
						<div className={`control-item button ${disableBack?'disable':''}`} onClick={()=>this.onClickStep(-1)}>BACK</div>
						<div className={`control-item button ${disableNext?'disable':''}`} onClick={()=>this.onClickStep(1)}>NEXT</div>
						<div className={`control-item button`} onClick={this.onClickExit}>EXIT</div>
					</div>
				</div>
			</div>
		);
	}
}
