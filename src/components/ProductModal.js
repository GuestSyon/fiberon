import React from 'react';

import {ReactComponent as SvgClose} from '../assets/images/close.svg';

export default class ProductModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selProduct:props.selProduct, productInner:props.productInner};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.selProduct !== nextProps.selProduct) {
			this.setState({selProduct:nextProps.selProduct});
		}
		if (this.state.productInner !== nextProps.productInner) {
			this.setState({productInner:nextProps.productInner});
		}
	}

	onClickButton = (item) => {
		this.props.setScene(item.key);
		setTimeout(() => { this.onClickClose(); }, 100);
	}

	onClickClose = () => {
		this.props.closeProductModal('productInner');
		setTimeout(() => { this.props.closeProductModal('selProduct'); }, 500);
	}

	render() {
		const {selProduct, productInner} = this.state;
		return (
			<div className={`product-modal modal-back ${selProduct?'active':''}`}>
				<div className={`modal-wrapper ${productInner?'active':''}`}>
					{selProduct &&
						<>
							<div className='modal-title'>{selProduct.title}</div>
							<div className='content flex'>
								{selProduct.rowArr.map((rowItem, rowIdx) =>
									<div className='product-row flex' key={rowIdx}>
										{rowItem.map((item, idx) =>
											<div className='product-button button' key={idx} onClick={()=>this.onClickButton(item)}>
												{item.label}
											</div>
										) }
									</div>
								) }
							</div>
						</>
					}
					<div className='close-icon flex' onClick={this.onClickClose}><SvgClose></SvgClose></div>
				</div>
			</div>
		);
	}
}
