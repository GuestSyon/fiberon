import React from 'react';

export default class LoadingComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pageKey:props.pageKey, loading: props.loading, loadPro:props.loadPro };
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey});
		}
		if (this.state.loading !== nextProps.loading) {
			if (nextProps.loading)
				this.setState({loading:true}, () => {
					this.setState({loadInner:true})
				});
			else {
				this.setState({loadInner:false});
				setTimeout(() => {
					this.setState({loading:false})
				}, 500);
			}
		}
		if (this.state.loadPro !== nextProps.loadPro) {
			this.setState({loadPro:nextProps.loadPro}, () => {
			});
		}
	}

	render() {
		const {pageKey, loading, loadPro, loadInner} = this.state;
		return (
			<div className={`back-board flex loading ${loading?'active':''} ${loadInner?'show':''}`}>
				{isNaN(loadPro) &&
					<div className='loading-circle grey'></div>
				}
				{!isNaN(loadPro) &&
					<>
						<div className='loading-circle'></div>
						<div className='loading-label'>{loadPro} %</div>
					</>
				}
			</div>
		);
	}
}
