import React from 'react';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';

export default class NoteModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showNote:props.showNote, showNoteInner:props.showNoteInner, noteArr:props.noteArr };
	}

	componendividMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['showNote', 'showNoteInner', 'noteArr'].forEach(stateKey => {
			if (this.state[stateKey] !== nextProps[stateKey]) {
				this.setState({[stateKey]:nextProps[stateKey]});
			}
		});
	}

	render() {
		const {showNote, showNoteInner, noteArr} = this.state;
		return (
			<div className={`note-modal modal-back ${showNote?'active':''}`}>
				<div className={`modal-wrapper ${showNoteInner?'active':''}`}>
					<div className='note-title modal-title'>Notifications</div>
					{noteArr.length > 0 && noteArr.map((noteItem, idx) =>
						<div className={`note-item flex ${noteItem.disable?'disable':''}`} key={idx}>
							<div className='note-left'>
								<div className='note-title'>{noteItem.title}</div>
								<div className='note-label'>{noteItem.deliveryLabel} {noteItem.message}</div>
							</div>
							<div className='view button' onClick={()=>this.props.selNoteModal(noteItem)}>View</div>
						</div>
					) }
					{noteArr.length === 0 &&
						<div className='empty-notification'>There are no notifications at this time.</div>
					}
					<div className='close-icon flex' onClick={()=>this.props.closeNote()}><SvgClose></SvgClose></div>
				</div>
			</div>
		);
	}
}
