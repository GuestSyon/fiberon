import React from 'react';
import NoteModalComponent from './NoteModal';
import {ReactComponent as SvgAlert} from '../assets/images/home/alert.svg';
import {ReactComponent as SvgHeart} from '../assets/images/home/heart.svg';

export default class TopComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showNote:false, showNoteInner:false, noteArr:props.noteArr, showFirst:props.showFirst, selScene:props.selScene};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (!this.state.noteArr !== nextProps.noteArr) {
			this.setState({noteArr:nextProps.noteArr});
		}
		if (this.state.showFirst !== nextProps.showFirst) {
			this.setState({showFirst:nextProps.showFirst});
		}
		if (this.state.selScene !== nextProps.selScene) {
			this.setState({selScene:nextProps.selScene});
		}
	}

	closeNote = (joinUrl) => {
		this.setState({showNoteInner:false});
		if (joinUrl) {
			const joinWindow = window.open(joinUrl, '_blank'); joinWindow.focus();
		}
		setTimeout(() => {
			this.setState({showNote:false})
		}, 500);
	}

	onClickNote = () => {
		this.setState({showNote:true}, ()=>this.setState({showNoteInner:true}));
	}

	render() {
		const {noteArr, showNote, showNoteInner, showFirst} = this.state;
		const notCount = noteArr.length ? noteArr.filter(item => {return !item.disable}).length : 0;
		return (
			<>
				<div className={`top-corner ${showFirst?'hide':''}`}>
					{/* <div className='button' onClick={this.onClickNote}>
						<div className='button-inner flex'>
							<SvgAlert></SvgAlert>
							<div className='bottom-label'>Notification</div>
							{ notCount > 0 && <div className='circle-count'>{notCount}</div> }
						</div>
					</div> */}
					<div className='button' onClick={this.props.openWishlist}>
						<div className='button-inner flex'>
							<SvgHeart></SvgHeart>
							<div className='bottom-label'>Favorites</div>
						</div>
					</div>
				</div>

				<NoteModalComponent
					showNote={showNote}
					showNoteInner={showNoteInner}
					noteArr={noteArr}
					closeNote={this.closeNote}
					selNoteModal={this.props.selNoteModal}
				></NoteModalComponent>

			</>
		);
	}
}
