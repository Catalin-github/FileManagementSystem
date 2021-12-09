import React, { Component } from "react";
import { I18nProvider, LOCALES } from "../i18nProvider";
import translate from "../i18nProvider/translate";
import ChangePassword from "./ChangePassword";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { Link, NavLink, withRouter, Redirect } from "react-router-dom";
import {
  fetchUsersLogin,fetchLoginGoogle,fetchLoginFacebook
} from "../redux/Authentication/action";
import { setLocales } from "../redux/Language/action";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  postLogin = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log("data.password")

    console.log(data.emai)
    console.log(data.password)
    this.props.fetchUsersLogin(data);
    if (true) {
    }
  };
  loginWithFacebook = (res) => {
    console.log("gooogle")
    console.log(res)

     this.props.fetchLoginFacebook(res);
  };
  loginWithGoogle = (res) => {
    console.log("gooogle333333333333333333333333")
    console.log(res)
    console.log(res.tokenId)
    console.log(res.profileObj.email)

 this.props.fetchLoginGoogle(  res );
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("data.password")

    this.postLogin();
  };

  render() {
    return (
			<div>
				<I18nProvider locale={this.props.locales}>
					<div>
						<div>
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

						<form onSubmit={this.handleSubmit}>
							<h3>{translate('log-in')}</h3>
							<div>
								<label htmlFor='email'>{translate('e-mail')}</label>
								<input
									type='text'
									name='email'
									placeholder='Email'
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='password'>{translate('pass-word')}</label>
								<input
									type='password'
									placeholder='Password'
									name='password'
									onChange={this.handleChange}
								/>
							</div>
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

							<button type='submit'>this is login</button>
						</form>
						<h3>
							Don't have an account yet ? <Link to='/register'>sign-up</Link>
						</h3>
						<h3>
							Back to
							<Link to='/'> home </Link>
						</h3>
						<div>
							<Link to='/ChangePassword'>Reset your password</Link>
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
