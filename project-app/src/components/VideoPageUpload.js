/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findVideos, uploadVideo } from '../redux/video/action';
import { setLocales } from '../redux/Language/action';
import { I18nProvider, LOCALES } from '../i18nProvider';
import translate from '../i18nProvider/translate';
export class VideoPageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoList: [],
			selectedFile: [],
		};
	}

	componentDidMount = () => {};

	showVideo = (e) => {
		if (e.target.files.length == 0) {
			return;
		}
		var videos = new Array();
		var reader = new Array();
		for (let i = 0; i < e.target.files.length; i++) {
			reader.push(new FileReader());
			videos.push(e.target.files[i]);
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
						name: videos[0].name,
						type: videos[0].type,
						data: item.result.split(',')[1],
					}); 
					var divId = document.createElement('div');
					divId.id = time.toString();
					var video = document.createElement('video');
 					video.width = 146;
					video.height = 136;
                    video.controls=true
                    
                    var source = document.createElement('source')
                    source.src=item.result
                    video.appendChild(source)
					divId.appendChild(video);
					document.getElementById('video-box').appendChild(divId);
					console.log(this.state.selectedFile);
				}
			};
		});
	};
	uploadVideoList = () => {
		for (let i = 0; i < this.state.selectedFile.length; i++) {
			document.getElementById(this.state.selectedFile[i].id).remove();
		}
		this.props.uploadVideo({
			data: this.state.selectedFile,
			email: this.props.client.data.email,
		});
		this.setState({ selectedFile: [] });
	};
	render() {
		console.log(this.props.video);
		console.log('videoe');

		return (
			<div id='wrapper-video-box'>
				<I18nProvider locale={this.props.locales}>
					<div
						id='wrapper-video-list'
						style={{
							display: 'flex',
							flexFlow: 'row wrap',
							justifyContent: 'space-between',
							flexDirection: 'column',
							flexWrap: 'wrap',
							alignContent: 'center',
							alignItems: 'center',
						}}>
						<div style={{ marginBottom: '40px' }}>
							<input type='file' onChange={this.showVideo}></input>
						</div>
						<div id={'video-box'}></div>
						<button onClick={this.uploadVideoList}>
							{translate('upload-theImage')}
						</button>
					</div>
				</I18nProvider>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		locales: state.locale.lang,
		client: state.users.user,
		video: state.video.video,
		loading: state.video.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		uploadVideo: (data) => dispatch(uploadVideo(data)),
		setLocale: (lang) => dispatch(setLocales(lang)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPageUpload);
