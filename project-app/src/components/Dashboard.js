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
				<h1>
					Welcome in app, {this.props.client.data.firstName}
					{
						(console.log('this.props.client.user[0].firstName'),
						console.log(this.props.client.data.firstName))
					}
					<div className='role'>{this.props.client.data.role}</div>
					<fieldset>
						<legend>
							{' '}
							<Link to='/account'>
								{' '}
								<button onClick={this.props.loginRequest}>My Account </button>
							</Link>
						</legend>
						<div
							style={{
								display: 'flex',
								flexdirection: 'row',
								justifyContent: 'space-around',
							}}>
							<a style={{ textDecoration: 'none' }} href='/portofoliu/imagini'>
								Portofoliu de imagini
							</a>
							<a style={{ textDecoration: 'none' }} href='/portofoliu/video'>
								Portofoliu de fisiere audio
							</a>
						</div>
					</fieldset>
				</h1>
				<button onClick={this.props.logoutUser}> Logout</button>
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
