/** @format */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { changePassword, loginRequest } from '../redux/Authentication/action';
import { connect } from 'react-redux';
import { I18nProvider, LOCALES } from '../i18nProvider';
import translate from '../i18nProvider/translate';
import { setLocales } from '../redux/Language/action';

class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			password_confirm: '',
		};
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			token: this.props.match.params.id,
			password: this.state.password,
			passwordConfirm: this.state.password_confirm,
		};
		if (this.state.password == this.state.password_confirm) {
			this.props.changePassword(data);
			this.props.history.push('/login');
		}
	};
	render() {
		return (
			<div>
				<I18nProvider locale={this.props.locales}>
					<h1 style={{ textAlign: 'center' }}>Reset your password</h1>
					<form style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
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
								style={{ marginBottom: '10px' }}
							/>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}>
							<label htmlFor='PasswordConfirm'>
								RE-{translate('pass-word')}
							</label>
							<input
								type='password'
								name='password_confirm'
								onChange={this.handleChange}
								style={{ marginBottom: '10px' }}
							/>
						</div>

						<button type='submit'>{translate('sa-ve')}</button>
					</form>
					<Link
						style={{
							position: 'relative',
							bottom: '218px',
							left: '1%',
							textDecoration: 'none',
						}}
						to='/'>
						{' '}
						{translate('back-home')}{' '}
					</Link>
				</I18nProvider>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isNotLogged: state.users.isAuth,
		locales: state.locale.lang,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePassword: (data) => dispatch(changePassword(data)),
		loginRequest: () => dispatch(loginRequest()),
		setLocale: (lang) => dispatch(setLocales(lang)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
