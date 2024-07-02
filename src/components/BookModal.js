import React from 'react';
import axios from 'axios';

import imgMessageLogo from '../assets/images/modal/message-right.jpg';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';
import { baseUrl } from '../data/config';

const apiUrl = baseUrl + '/api/celebrationmessage/';

export default class BookModalComponent extends React.Component {
	constructor(props) {
		super(props);
		const {bookModal, bookInner, userInfo} = props;
		this.state = {bookModal, bookInner, userInfo, strName:'', strMessage:''};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['bookModal', 'bookInner', 'userInfo'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key], strName:'', strMessage:''});
			}
		});
	}

	onChangeStr = (e, key) => {
		const str = e.target.value;
		this.setState({[key]:str});
	}

	sendMessage = () => {
		const {strName, strMessage, userInfo} = this.state, reqData = {name:strName, message:strMessage, user_id:userInfo.id};
		if (!strName || !strMessage) {return;}
		this.props.setLoading(true);
		axios.post(apiUrl+"post", reqData).then((res) => {
			this.props.setLoading(false);
			if (res.data.response == "success") {
			} else {
				window.alert('Failed to send message');
			}
			this.closeBookModal();
		});
	}

	closeBookModal = () => {
		this.props.closeBookModal('bookInner');
		setTimeout(() => { this.props.closeBookModal('bookModal') }, 500);
	}

	openListModal = () => {
		this.props.setLoading(true);
		axios.get(apiUrl+"get").then((res) => {
			this.props.setLoading(false);
			if (res.data.response == "success" && res.data.data) {
				this.setState({listModal:res.data.data}, () => { this.setState({listInner:true}); });
			} else {
				window.alert('Failed to get message-data');
			}
		});
	}

	render() {
		const {bookModal, bookInner, strName, strMessage, listModal, listInner} = this.state;
		return (
			<div className={`book-modal modal-back ${bookModal?'active':''}`}>
				<div className={`modal-wrapper flex ${bookInner?'active':''}`}>
					<div className='modal-title'>Leave a Celebration Message</div>
					<div className='content main-content flex'>
						<div className='content-part flex'>
							<div className='info-item'>
								<div className='info-label'>Name : </div>
								<div className='info-input'>
									<input value={strName} onChange={e=>this.onChangeStr(e, 'strName')}></input>
								</div>
							</div>
							<div className='info-item'>
								<div className='info-label'>Message : </div>
								<div className='info-input'>
									<textarea value={strMessage} onChange={e=>this.onChangeStr(e, 'strMessage')}></textarea>
								</div>
							</div>
							<div className='btn-row flex'>
								<div className={`button btn-send-message ${(!strName || !strMessage)?'disable':''}`} onClick={this.sendMessage}>Send Message</div>
								<div className='button btn-open-list' onClick={this.openListModal}>See what other visitors wrote</div>
							</div>
						</div>
						<div className='content-part flex'>
							<img src={imgMessageLogo} alt=''></img>
						</div>
					</div>
					<div className='close-icon flex' onClick={this.closeBookModal}><SvgClose></SvgClose></div>
				</div>

				<div className={`list-modal modal-back ${listModal?'active':''}`}>
					<div className={`modal-wrapper flex ${listInner?'active':''}`}>
						<img src={imgMessageLogo} alt=''></img>
						<div className='modal-title'>Thanks for visiting</div>
						<div className='content scroll scroll-y'>
							{listModal && listModal.length > 0 && listModal.map((item, idx)=>
								<div className='message-item' key={idx}>
									<div className='message-line message-name'>{item.name}</div>
									<div className='message-line message-content'>{item.message}</div>
								</div>
							)}
							{listModal && !listModal.length &&
								<div className='note-label'>
									There is not any message yet
								</div>
							}
						</div>
						<div className='close-icon flex' onClick={()=>{
							this.setState({listInner:false})
							setTimeout(() => { this.setState({listModal:false}) }, 500);
						}}><SvgClose></SvgClose></div>
					</div>
				</div>

			</div>
		);
	}
}
