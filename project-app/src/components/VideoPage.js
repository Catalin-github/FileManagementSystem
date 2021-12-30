/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findVideo, removeVideo } from '../redux/video/action';
import VideoPageDesign from './VideoPageDesign.css';
import { I18nProvider, LOCALES } from '../i18nProvider';
 import { setLocales } from '../redux/Language/action';
import translate from '../i18nProvider/translate';
import {
	BrowserRouter,
	Route,
	Router,
	Link,
	Switch,
	NavLink,
} from 'react-router-dom';
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
					<I18nProvider locale={this.props.locales}>
						<div
							style={{
								marginBottom: '40px',
								textAlignLast: 'right',
								position: 'relative',
								right: '2%',
							}}>
							<Link
								style={{ textDecoration: 'none' }}
								to='/portofoliu/upload/video'>
								{translate('up-vid')}
							</Link>
						</div>
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
											<p style={{ padding: '12px' }}>{name}</p>
											<div onClick={() => this.removeVideoItem(id)}>
												<a>{translate('de-lete')}</a>
											</div>
										</div>
									</div>
								))}
						</div>
					</I18nProvider>
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
		setLocale: (lang) => dispatch(setLocales(lang)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
