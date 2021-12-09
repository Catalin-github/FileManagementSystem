/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findImages, uploadImages } from '../redux/image/action';

export class ImagePageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageList: [],
			selectedFile: [],
		};
	}

	componentDidMount = () => {
	 
	};

	showImage = (e) => {
		if (e.target.files.length == 0) {
			return;
		}
		var images = new Array();
		var reader = new Array();
		for (let i = 0; i < e.target.files.length; i++) {
			reader.push(new FileReader());
			images.push(e.target.files[i]);
		}
		for (let j = 0; j < e.target.files.length; j++) {
			reader[j].readAsDataURL(e.target.files[j]);
		}
		reader.map((item) => {
			item.onload = () => {
				if (item.readyState == 2) {
					var date = new Date();
					var time = date.getTime();
					this.state.selectedFile.push({
						id: time.toString(),
						name: images[0].name,
						type: images[0].type,
						data: item.result.split(',')[1],

					});
					console.log(images[0].name);
					console.log(images[0].type);
					console.log(item);
					console.log('IMTEM ITEM');
					var divId = document.createElement('div');
					divId.id = time.toString();
					var image = document.createElement('img');
					image.src = item.result;
					image.width = 146;
					image.height = 136;
					divId.appendChild(image);
					document.getElementById('image-box').appendChild(divId);
					console.log(this.state.selectedFile);
				}
			};
		});
	};
	uploadImage = () => {
		for (let i = 0; i < this.state.selectedFile.length; i++) {
			document.getElementById(this.state.selectedFile[i].id).remove();
		}
		this.props.uploadImages({data:this.state.selectedFile,
            email:this.props.client.data.email});
		this.setState({ selectedFile: [] });
	};
	render() {
		console.log(this.props.image);
		console.log('imagee');
		 
			return (
				<div id='wrapper-image-box'>
					<div
						id='wrapper-image-list'
						style={{
							display: 'flex',
							flexFlow: 'row wrap',
							justifyContent: 'space-between',
							flexDirection: 'column',
							flexWrap: 'wrap',
							alignContent: 'center',
							alignItems: 'center',
						}}>
						<div>
							<input type='file' onChange={this.showImage}></input>
						</div>
						<div id={'image-box'}></div>
						<button onClick={this.uploadImage}>Incarca imaginile</button>
					</div>
				</div>
			);
		 
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
		uploadImages: (data) => dispatch(uploadImages(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ImagePageUpload);
