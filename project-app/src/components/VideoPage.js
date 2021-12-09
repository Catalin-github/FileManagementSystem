/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findVideo, removeVideo } from '../redux/video/action';
import VideoPageDesign from './VideoPageDesign.css';
export class VideoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoList: this.props.video,
		};
	}

	componentDidMount = () => {
		console.log(this.props.client);
		this.props.findVideo(this.props.client.data.email);
	};

	removeVideoItem = (id) => {
		this.props.removeVideo(id);
		if (document.getElementById(id) != null) {
			document.getElementById(id).remove();
		}
	};

	render() {
		 
		if (this.props.loading == true) {
			return <div>Loading...</div>;
		} else {
			return (
				<div id='wrapper-video-box' style={{ width: '100%', height: '100%' }}>
					<div
						id='wrapper-video-list'
						style={{
							display: 'flex',
							flexFlow: 'row wrap',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							alignContent: 'center',
						}}>
						{this.props.video.length >= 0 &&
							this.props.video.map(({ name, type, data, id }, index) => (
								<div className='list-video' id={id} key={index + '-' + id}>
									<img
										width='100px'
										height='100px'
										src={`data:video/${type};base64,${data}`}
									/>
									<div className='details-video'>
										<p>{name}</p>
										<div onClick={() => this.removeVideoItem(id)}>
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
		video: state.video.video,
		loading: state.video.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findVideo: (id) => dispatch(findVideo(id)),
		removeVideo: (id) => dispatch(removeVideo(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
