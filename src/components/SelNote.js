import React from 'react';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';

export default class SelNoteComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selNote:props.selNote, selNoteInner:props.selNoteInner };
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['selNote', 'selNoteInner'].forEach(stateKey => {
			if (this.state[stateKey] !== nextProps[stateKey]) {
				this.setState({[stateKey]:nextProps[stateKey]});
			}
		});
	}

	closeModal = () => {
		this.props.closeSelNote('selNoteInner');
		setTimeout(() => { this.props.closeSelNote('selNote'); }, 500);
	}

	render() {
		const {selNote, selNoteInner} = this.state;
		return (
			<div className={`selNote-modal modal-back ${selNote?'active':''}`}>
				<div className={`modal-wrapper ${selNoteInner?'active':''}`}>
					{selNote &&
						<>
							<div className='note-title modal-title'>{selNote.title}</div>
							<div className={`note-item `}>
								<div className='note-top'>
									<div className='note-time'>{selNote.message}</div>
								</div>
								<div className='note-bottom flex'>
									<div className='button' onClick={()=>{
										const joinWindow = window.open(selNote.link, '_blank'); joinWindow.focus();
									}}>Join</div>
								</div>
							</div>
							<div className='close-icon flex' onClick={this.closeModal}><SvgClose></SvgClose></div>
						</>
					}
				</div>
			</div>
		);
	}
}
