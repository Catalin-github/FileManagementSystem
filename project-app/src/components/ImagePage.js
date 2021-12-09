/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findImages, removeImage } from '../redux/image/action';
import ImagePageDesign from './ImagePageDesign.css';
export class ImagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageList: this.props.image,
		};
	}

	componentDidMount = () => {
		console.log(this.props.client);
		this.props.findImage(this.props.client.data.email);
	};

	removeImage = (id) => {
		this.props.removeImage(id);
		if (document.getElementById(id) != null) {
			document.getElementById(id).remove();
		}
	};

	render() {
		console.log(this.props.image);
		console.log('imagee');
		if (this.props.loading == true) {
			return <div>Loading.....</div>;
		} else {
			return (
				<div id='wrapper-image-box' style={{ width: '100%', height: '100%' }}>
					<div
						id='wrapper-image-list'
						style={{
							display: 'flex',
							flexFlow: 'row wrap',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							alignContent: 'center',
						}}>
						{this.props.image.length>=0 && this.props.image.map(({ name, type, data, id }, index) => (
							<div className='list-image' id={id} key={index + '-' + id}>
								<img
									width='100px'
									height='100px'
									src={`data:image/${type};base64,${data}`}
								/>
								<div className='details-image'>
									<p>{name}</p>
									<div onClick={() => this.removeImage(id)}>
										<a>Sterge</a>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		locales: state.locale.lang,
		client: state.users.user,
		image: state.image.image,
		loading: state.image.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findImage: (id) => dispatch(findImages(id)),
		removeImage: (id) => dispatch(removeImage(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
