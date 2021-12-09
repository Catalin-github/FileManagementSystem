import React, { Component } from "react";
import Register from "./Register";
import { Link } from "react-router-dom";
import translate from "../i18nProvider/translate";
import { I18nProvider, LOCALES } from "../i18nProvider";
import { setLocales } from "../redux/Language/action";
import UserProfile from "./UserProfile";
import { connect } from "react-redux";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import {
  verifyAuthentication,
  logoutUser,
  editProfile, loginRequest
} from "../redux/Authentication/action";
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("I am in MyAccount");
    return (
      <div>
        <I18nProvider locale={this.props.locales}>
          <div>
            <button onClick={() => this.props.setLocale(LOCALES.ENGLISH)}>
              English
            </button>{" "}
            |{" "}
            <button onClick={() => this.props.setLocale(LOCALES.GERMAN)}>
              German
            </button>{" "}
            {""}|{" "}
            <button onClick={() => this.props.setLocale(LOCALES.ROMANIAN)}>
              Romanian
            </button>{" "}
          </div>
          <div>
            <UserProfile />
          </div>
          <h1>
            <NavLink to="/dashboard" activeStyle={{ color: "red" }}>
              <button onClick={this.props.loginRequest}>Dashboard</button>
            </NavLink>
            </h1>
            <h1>
            <NavLink to="/"><button onClick={this.props.loginRequest}>You are in app so go back</button></NavLink>
           
          </h1>
        </I18nProvider>
      </div>
    );   

  }
}
const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,
    isAuth: state.users.isAuth,
    client: state.users.user,
    edit: state.users.edit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    setLocale: (lang) => dispatch(setLocales(lang)),
    editProfile: () => dispatch(editProfile()),
    loginRequest: () => dispatch(loginRequest()),

    loginRequest: () => dispatch(loginRequest()),
    verifyAuthentication: (verifyToken) => dispatch(verifyAuthentication(verifyToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
