/** @format */

import React, { Component } from 'react';
import { I18nProvider, LOCALES } from '../i18nProvider';
import translate from '../i18nProvider/translate';
import ChangePassword from './ChangePassword';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import {
	fetchUsersLogin,
	fetchLoginGoogle,
	fetchLoginFacebook,
} from '../redux/Authentication/action';
import { setLocales } from '../redux/Language/action';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	postLogin = () => {
		const data = {
			email: this.state.email,
			password: this.state.password,
		};
	 
		this.props.fetchUsersLogin(data);
		 
	};
	loginWithFacebook = (res) => {
	 

		this.props.fetchLoginFacebook(res);
	};
	loginWithGoogle = (res) => {
	 

		this.props.fetchLoginGoogle(res);
	};
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		console.log('data.password');

		this.postLogin();
	};

	render() {
		return (
			<div>
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
						</div>
						<h3>
							<Link style={{ textDecoration: 'none' }} to='/'>
								{translate('back-home')}{' '}
							</Link>
						</h3>

						<form style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
							<h3>{translate('log-in')}</h3>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<label htmlFor='email'>{translate('e-mail')}</label>
								<input
									type='text'
									name='email'
									 
									onChange={this.handleChange}
									style={{ marginBottom: '10px' }}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<label htmlFor='password'>{translate('pass-word')}</label>
								<input
									type='password'
									 
									name='password'
									onChange={this.handleChange}
									style={{ marginBottom: '19px' }}
								/>
							</div>

							<button
								type='submit'
								style={{ marginBottom: '19px', width: '90px' }}>
								{translate('log-in')}
							</button>
							<div>
								<GoogleLogin
									clientId={
										'82228403613-6fhhn3kt5j5hsl76hj6cdjg1n341dop7.apps.googleusercontent.com'
									}
									buttonText={'Login'}
									onSuccess={this.loginWithGoogle}
									cookiePolicy={'single_host_origin'}
									onFailure={this.loginWithGoogle}
								/>
							</div>
						</form>
						<h3 style={{ textAlign: 'center' }}>
							{translate('dont-Account')}{' '}
							<Link to='/register'>{translate('sign-up')}</Link>
						</h3>

						<div style={{ textAlign: 'center' }}>
							<Link to='/ChangePassword'>{translate('reset-pass')}</Link>
						</div>
					</div>
				</I18nProvider>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userData: state.users,
		locales: state.locale.lang,
		isNotLogged: state.users.isAuth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsersLogin: (data) => dispatch(fetchUsersLogin(data)),
		setLocale: (lang) => dispatch(setLocales(lang)),
		fetchLoginGoogle: (res) => dispatch(fetchLoginGoogle(res)),
		fetchLoginFacebook: (res) => dispatch(fetchLoginFacebook(res)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
