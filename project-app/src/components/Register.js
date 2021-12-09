import React, { Component, useEffect } from "react";
import { Link, NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsersRegister } from "../redux/Authentication/action";
import { I18nProvider, LOCALES } from "../i18nProvider";
import translate from "../i18nProvider/translate";
import { setLocales } from "../redux/Language/action";
import { Route  } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      firstName: "",
      lastName: "",
      phone: "",
      registration:this.props.register
    };
  }

  postRegister =  () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
    };

    this.setState({
       registration: this.props.fetchUsersRegister(data) ,
    });

     
      console.log("emaiemail")  

      console.log("after email")
    }
  

   
 

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.postRegister();
  };
  render() {
    console.log("x")

   console.log( this.state.registration)
    if(this.state.registration){
      this.props.history.push("/email-confirmation")
    }
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
							</button>
							{''}|{' '}
							<button onClick={() => this.props.setLocale(LOCALES.ROMANIAN)}>
								Romanian
							</button>{' '}
						</div>
						<form onSubmit={this.handleSubmit}>
							<h3>{translate('register-')}</h3>

							<div>
								<label htmlFor='email'>{translate('e-mail')}</label>
								<input
									type='email'
									name='email'
									placeholder='Email'
									required
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='password_confirm'>
									{translate('pass-word')}
								</label>
								<input
									type='password'
									placeholder='Confirm Password'
									name='password_confirm'
									required
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
								<label htmlFor='firstName'>
									{translate('first-name')}
									{/* , { name:<code>Samuel</code> } */}
								</label>
								<input
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
									type='text'
									name='phone'
									placeholder='Phone'
									onChange={this.handleChange}
								/>
							</div>
							<button type='submit'>{translate('register-')}</button>
						</form>
					</div>
					<div>
						<h4>
							{' '}
							You already have an account? <Link to='/login'>sign-in</Link>{' '}
						</h4>
					</div>
					<div>
						{' '}
						<h3>
							{' '}
							Back to <Link to='/'> home </Link>{' '}
						</h3>{' '}
					</div>
				</I18nProvider>
			</div>
		);
  }
}
const mapStateToProps = (state) => {
  return {
    registerSucces: state.users.feched,
    register:state.users.register,
    locales: state.locale.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (lang) => dispatch(setLocales(lang)),
    fetchUsersRegister: (data) => dispatch(fetchUsersRegister(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
