/** @format */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import translate from '../i18nProvider/translate';
import { I18nProvider, LOCALES } from '../i18nProvider';
import { setLocales } from '../redux/Language/action';
import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import {
	verifyAuthentication,
	logoutUser,
	fetchUserDeleteAccount,
	fetchUsersEditProfile,
	editProfile,
} from '../redux/Authentication/action';
class MyAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: this.props.client.data.email,
			firstName: this.props.client.data.firstName,
			lastName: this.props.client.data.lastName,
			phone: this.props.client.data.phone,
			accountType: this.props.client.data.account_type,
		};
	}
	postEdit = () => {
		const data = {
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phone: this.state.phone,
		};

		this.props.fetchUsersEditProfile(data);
	};
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.postEdit();

		console.log(this.props.loading);
	};

	render() {
		return !this.props.edit ? (
			<div>
				<I18nProvider locale={this.props.locales}>
					<div>
						<form>
							<fieldset>
								<legend>
									<h2> {translate('my-account')}</h2>
								</legend>

								<label>
									{translate('first-name')}: {this.props.client.data.firstName}
								</label>
								<br></br>
								<label>
									{translate('last-name')}: {this.props.client.data.lastName}
								</label>
								<br></br>
								<label>
									{translate('e-mail')}: {this.props.client.data.email}
								</label>
								<br></br>
								<label>
									{translate('phone-number')}: {this.props.client.data.phone}
								</label>
								<br></br>
								<label>
									{translate('acc-type')}: {this.props.client.data.account_type}
								</label>
								<br></br>
								<button onClick={this.props.editProfile}>
									{translate('edit-profile')}
								</button>
							</fieldset>
						</form>
					</div>
				</I18nProvider>
			</div>
		) : (
			<div>
				<I18nProvider locale={this.props.locales}>
					<form onSubmit={this.handleSubmit}>
						<fieldset>
							<legend>
								<h2>Edit Profile</h2>
							</legend>
							<div>
								<label htmlFor='email'>{translate('e-mail')}</label>
								<input
									value={this.state.email}
									type='email'
									name='email'
									disabled={this.state.account_type == 'basic' ? false : true}
									placeholder='Email'
									required
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='firstName'>{translate('first-name')}</label>
								<input
									value={this.state.firstName}
									type='text'
									name='firstName'
									placeholder='First Name'
									required
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='lastName'>{translate('last-name')}</label>
								<input
									value={this.state.lastName}
									type='text'
									name='lastName'
									placeholder='Last Name'
									required
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='phone'>{translate('phone-number')}</label>
								<input
									value={this.state.phone}
									type='text'
									name='phone'
									placeholder='Phone'
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<button type='submit'> {translate('sa-ve')}</button>
								<button onClick={this.props.editProfile}>
									{translate('can-cel')}
								</button>
							</div>
						</fieldset>
					</form>
				</I18nProvider>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		locales: state.locale.lang,
		client: state.users.user,
		edit: state.users.edit,
		loading: state.users.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: () => dispatch(logoutUser()),
		setLocale: (lang) => dispatch(setLocales(lang)),
		fetchUserDeleteAccount: (verifyToken) =>
			dispatch(fetchUserDeleteAccount(verifyToken)),
		fetchUsersEditProfile: (data) => dispatch(fetchUsersEditProfile(data)),
		editProfile: () => dispatch(editProfile()),
		verifyAuthentication: (data) => dispatch(verifyAuthentication(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
