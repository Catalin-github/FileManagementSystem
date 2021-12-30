/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findImages, removeImage } from '../redux/image/action';
import ImagePageDesign from './ImagePageDesign.css';
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
					<I18nProvider locale={this.props.locales}>
						<div
							style={{
								marginBottom: '40px',
								textAlignLast: 'right',
								position: 'relative',
								right: '2%',
							}}>
							<a
								style={{ textDecoration: 'none' }}
								href='/portofoliu/upload/image'>
								{' '}
								{translate('up-image')}
							</a>
						</div>

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
							{this.props.image.length >= 0 &&
								this.props.image.map(({ name, type, data, id }, index) => (
									<div className='list-image' id={id} key={index + '-' + id}>
										<img
											width='100px'
											height='100px'
											src={`data:image/${type};base64,${data}`}
										/>
										<div className='details-image'>
											<p style={{ padding: '12px' }}>{name}</p>
											<div onClick={() => this.removeImage(id)}>
												<a> {translate('de-lete')}</a>
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
		image: state.image.image,
		loading: state.image.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findImage: (id) => dispatch(findImages(id)),
		removeImage: (id) => dispatch(removeImage(id)),
		setLocale: (lang) => dispatch(setLocales(lang)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
