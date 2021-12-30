/** @format */

import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';
import Homepage from './Homepage';
import MyAccount from './MyAccount';
import { connect } from 'react-redux';
import { setLocales } from '../redux/Language/action';
import { I18nProvider, LOCALES } from '../i18nProvider';
import {
	BrowserRouter,
	Route,
	Router,
	Link,
	Switch,
	NavLink,
} from 'react-router-dom';
import translate from '../i18nProvider/translate';
import { logoutUser, loginRequest } from '../redux/Authentication/action';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<I18nProvider locale={this.props.locales}>
					<h1>
						<div style={{ textAlign: 'center' }}>
							{' '}
							{translate('welcome-again')}, {this.props.client.data.firstName}
						</div>

						<div className='role'>{this.props.client.data.role}</div>
						<fieldset>
							<legend>
								{' '}
								<Link to='/account'>
									{' '}
									<button onClick={this.props.loginRequest}>
										{translate('my-account')}{' '}
									</button>
								</Link>
							</legend>
							<div
								style={{
									display: 'flex',
									flexdirection: 'row',
									justifyContent: 'space-around',
								}}>
								<Link
									style={{ textDecoration: 'none' }}
									to='/portofoliu/imagini'>
									{translate('image-port')}
								</Link>
								<Link style={{ textDecoration: 'none' }} to='/portofoliu/video'>
									{translate('file-port')}
								</Link>
							</div>
						</fieldset>
					</h1>
					<button
						style={{ bottom: '213px', position: 'relative', left: '1%' }}
						onClick={this.props.logoutUser}>
						{' '}
						{translate('log-out')}
					</button>
				</I18nProvider>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		locales: state.locale.lang,
		client: state.users.user,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setLocale: (lang) => dispatch(setLocales(lang)),
		logoutUser: () => dispatch(logoutUser()),
		loginRequest: () => dispatch(loginRequest()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
