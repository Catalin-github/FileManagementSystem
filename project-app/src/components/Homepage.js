/** @format */

import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import { FormattedMessage } from 'react-intl';
import MyAccount from './MyAccount';
import ChangePassword from './ChangePassword';

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

class Homepage extends Component {
	render() {
		return (
			<I18nProvider locale={this.props.locales}>
				<div>
					<div style={{ textAlign: 'center' }}>
						<button onClick={() => this.props.setLocale(LOCALES.ENGLISH)}>
							English
						</button>{' '}
						|{' '}
						<button onClick={() => this.props.setLocale(LOCALES.GERMAN)}>
							German
						</button>{' '}
						{''}|{' '}
						<button onClick={() => this.props.setLocale(LOCALES.ROMANIAN)}>
							Romanian
						</button>{' '}
					</div>{' '}
					<Link
						style={{
							position: 'relative',
							left: '3%',
							bottom: '15px',
							textDecoration: 'overline',
							color: 'white',
						}}
						to='/help'>
						{translate('hel-p')}
					</Link>
					<h1 style={{ textAlign: 'center' }}>{translate('welcome-home')}</h1>
					<div
						style={{
							textAlign: 'center',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							alignItems: 'center',
						}}>
						<NavLink to='/login' activeStyle={{ color: 'red' }}>
							{translate('log-in')}
						</NavLink>{' '}
						<NavLink to='/register' activeStyle={{ color: 'red' }}>
							{translate('register-')}
						</NavLink>
					</div>
				</div>
			</I18nProvider>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		locales: state.locale.lang,
		client: state.users.user,
		loaded: state.users.loaded,
		isAuth: state.users.isAuth,
		loading: state.users.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setLocale: (lang) => dispatch(setLocales(lang)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
