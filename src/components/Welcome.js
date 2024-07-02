import React from 'react';
import axios from 'axios';

import imgWelcome from '../assets/images/welcome/welcome-logo.png';
import { DisplayInput } from '../data/model';
import { baseUrl } from '../data/config';

export default class WelcomeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.checkFirstLoading = true;
		const {pageKey, loading, preEmail} = props;
		const email ='test@gmail.com';
		this.state = {pageKey, email, preEmail, formType:'login', visitorTypeArr:[], loading}; // 
	}

	componentDidMount() {
		if (this.props.skipTest) this.props.callCanvasPage({area_id:4, id:279});
		this.getJobRoleData();
		document.addEventListener("keyup", (event) => {
			const {pageKey, formType} = this.state;
			if (pageKey !== 'welcome') return;
			if (event.keyCode === 13) {
				if (formType==='login') this.onClickLogin();
				else this.onClickSignup();
			}
		});
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey});
		}
		if (this.state.preEmail !== nextProps.preEmail) {
			this.setState({preEmail:nextProps.preEmail});
		}
		if (this.state.loading !== nextProps.loading) {
			this.setState({loading:nextProps.loading});
			if (this.state.loading && !nextProps.loading && this.state.preEmail && this.checkFirstLoading) {
				this.checkFirstLoading = false;
				console.log(this.checkFirstLoading);
	
				this.setState({email:this.state.preEmail}, () => {
					this.onClickLogin();
				})
			}
		}
	}

	getJobRoleData = () => {
		axios.get(baseUrl+"/api/job/roles/get").then((res) => {
			if (res.data.response==='success' && res.data.job_roles) {
				const visitorTypeArr = [];
				res.data.job_roles.forEach(item => {
					visitorTypeArr.push(item.role);
				});
				this.setState({visitorTypeArr});
			} else {window.alert('Failed to get visitor type values!')}
		});
	}

	changeJobRole = (e) => {
		this.setState({job_role:e.target.value});
	}
	changeCheckLearn = () => {
		this.setState({learn_about_product:!this.state.learn_about_product});
	}

	changeInput = (e, key) => {
		var str = e.target.value;
		this.setState({[key]:str});
	}

	checkEmail = (str) => {
		return String(str).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	}

	onClickLogin = (e) => {
		DisplayInput();
		const {email} = this.state;
		if (!this.checkEmail(email)) {
			window.alert('Please write the correct email format');
			return;
		}

		this.props.setLoading(true);
		axios.post(baseUrl+"/api/verify/email", { email, device_type:this.props.apiDevice}).then((res) => {
			const {data} = res;
			if (data.response === "success") {
				if (data.is_registered=== 0) {
					this.setState({formType:'signup'});
				} else {
					this.props.callCanvasPage(data.user);
				}
			} else {
				window.alert('Failed to check login, please try again');
			}
			setTimeout(() => { this.props.setLoading(false); }, 1000);
		}).catch((error) => {
			window.alert(error);
			this.props.callCanvasPage({id:334});
		});
	}

	onClickSignup = () => {
		const {email, first_name, last_name, city, country, state, title, company, product_used, interest, job_role, zip, learn_about_product, otherType} = this.state;
		if (!email || !first_name || !last_name || !company || !product_used || !interest || !job_role || !zip || !city || !country || !state || !title) {
			window.alert('Please fill all input boxes'); return;
		} else if (job_role==='Other'&& !otherType) {
			window.alert('Please fill Other job format'); return;
		}
		const href_url = window.location.href;
		// const ibsx = href_url.substring(href_url.indexOf("?")+1)==='ibsx'?1:0;
		const realType = job_role==='Other'?otherType:job_role;
		const reqData = { email: email, first_name, last_name, zip, company, product_used, interest, job_role, learn_about_product:learn_about_product?'Yes':'No', city, country, state, title, device_type:this.props.apiDevice }
		this.props.setLoading(true);
		axios.post(baseUrl+"/api/register/user", reqData).then((res) => {
			this.props.setLoading(false);
			const {data} = res;
			if (data.response === "success") {
				this.props.callCanvasPage(data.user, true)
			} else {
				window.alert('Failed to register user info');
			}
		});
	}

	render() {
		const {pageKey, email, formType, first_name, last_name, city, state, company, country, zip, product_used, interest, title, job_role, learn_about_product, visitorTypeArr, otherType} = this.state;
		return (
			<div className={`back-board welcome flex ${pageKey==='welcome'?'active':''}`}>
				<div className='back-board back-image'></div>
				<div className={`welcome-wrapper flex ${formType}-wrapper`}>
					<div className='label-top flex'>{formType==='login'?'Welcome To':'Sign Up'}</div>
					{formType==='login' && <div className='welcome-logo flex'><img src={imgWelcome}></img></div>}
					<div className={`input-wrapper ${formType} flex`}>
						{formType === 'login' &&
							<input className='email-input' value={email} onChange={(e)=>this.changeInput(e, 'email')} placeholder='Enter Company Email Here...'></input>
						}
						{formType === 'signup' &&
							<>
								<div className='sign-row'>
									<input value={first_name} onChange={(e)=>this.changeInput(e, 'first_name')} placeholder='First Name'></input>
									<input value={last_name} onChange={(e)=>this.changeInput(e, 'last_name')} placeholder='Last Name'></input>
								</div>
								<div className='sign-row'>
									<input value={city} onChange={(e)=>this.changeInput(e, 'city')} placeholder='City'></input>
									<input value={state} onChange={(e)=>this.changeInput(e, 'state')} placeholder='State'></input>
								</div>
								<div className='sign-row'>
									<input value={zip} onChange={(e)=>this.changeInput(e, 'zip')} placeholder='Zip Code' type='number'></input>
									<input value={country} onChange={(e)=>this.changeInput(e, 'country')} placeholder='Country'></input>
								</div>
								<div className='sign-row'>
									<input value={company} onChange={(e)=>this.changeInput(e, 'company')} placeholder='Company'></input>
									<input value={product_used} onChange={(e)=>this.changeInput(e, 'product_used')} placeholder='Product Used'></input>
								</div>
								<div className='sign-row'>
									<input value={interest} onChange={(e)=>this.changeInput(e, 'interest')} placeholder='Product Interest'></input>
									<input value={title} onChange={(e)=>this.changeInput(e, 'title')} placeholder='Title'></input>
								</div>
								<div className='sign-row'>
									<select className='job-role' defaultValue='' value={job_role} onChange={this.changeJobRole}>
										<option value="" disabled hidden>Visitor Type</option>
										{visitorTypeArr.map((item, idx) =>
											<option value={item} key={idx}>{item}</option>
										) }
									</select>
								</div>
								{job_role==='Other' &&
									<div className={`sign-row one-item ${job_role==='Other'?'other-job':''}`}>
										<input value={otherType} onChange={(e)=>this.changeInput(e, 'otherType')} placeholder='Please Enter Visitor Type'></input>
									</div>
								}
								<div className={`sign-row check-row flex`}>
									<input className='role-check' type='checkbox' checked={learn_about_product} onClick={this.changeCheckLearn}></input>
									<label>Would you like to learn more about installing Fiberon products?</label>
								</div>
								{learn_about_product && <div className={`red-label `}>You will be receiving more information through email.</div>}
								
							</>
						}
					</div>
					<div className='button-wrapper flex'>
						{formType==='signup' &&
							<div className='button' onClick={()=>this.setState({formType:'login'})}>Back</div>
						}
						<div className='button' onClick={()=>{
							if 	(formType==='login') this.onClickLogin();
							else this.onClickSignup();
						}}>Submit</div>
					</div>
					<div className='label-bottom flex'>
						<div> For Questions, Feedback and Technical Issues&nbsp;&nbsp;</div>
						<div> Please Contact Us At: <label className='blue' onClick={()=>{
								const newTab = window.open('https://www.fiberondecking.com/vehelpdesk', '_blank');
								newTab.focus();
							}}>&nbsp;Help Desk</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
