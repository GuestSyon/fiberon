import React from 'react';
import {ReactComponent as SvgClose} from '../assets/images/close.svg';

export default class FavorModalComponent extends React.Component {
	constructor(props) {
		super(props);
		const {showWishlist, showWishlistInner, wishlists} = props;
		this.state = {showWishlist, showWishlistInner, wishlists };
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['showWishlist', 'showWishlistInner', 'wishlists'].forEach(stateKey => {
			if (this.state[stateKey] !== nextProps[stateKey]) {
				this.setState({[stateKey]:nextProps[stateKey]});
			}
		});
	}

	getFavorTitle = (title) => {
		if (title.length < 22) return title;
		else return title.substring(0, 20)+'...';
	}

	render() {
		const {showWishlist, showWishlistInner, wishlists} = this.state;
		return (
			<div className={`favor-modal modal-back flex ${showWishlist?'active':''}`}>
				<div className={`modal-wrapper ${showWishlistInner?'active':''}`}>
					<div className='favor-title modal-title'>Favorites</div>
					{wishlists.length > 0 ?
						<div className='favor-table scroll scroll-y'>
							<div className='th tr'>
								<div className='title'>Title</div>
								<div className='location'>Location</div>
								<div className='icon'></div>
							</div>
							{wishlists.map((item, idx) =>
								<div className='tr' key={idx}>
									<div className='title' onClick={()=>this.props.onClickWishlist(item)}><label>{this.getFavorTitle(item.title)}</label></div>
									<div className='location' onClick={()=>this.props.onClickWishlist(item)}><label>{item.location}</label></div>
									<div className='icon' onClick={()=> this.props.removeWishlist(item.id)}>
										<div className='icon-wrapper'>-</div>
									</div>
								</div>
							) }
						</div>:
						<div className='empty-favor'>Your selected favorites will appear here</div>
					}
					<div className='close-icon flex' onClick={()=>this.props.closeWishlist()}><SvgClose></SvgClose></div>
				</div>
			</div>
		);
	}
}
