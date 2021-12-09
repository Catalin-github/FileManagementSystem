import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

import { FormattedMessage } from "react-intl";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import MyAccount from "./MyAccount";
import ChangePassword from "./ChangePassword";

import { connect } from "react-redux";
import { setLocales } from "../redux/Language/action";
import { I18nProvider, LOCALES } from "../i18nProvider";
import {
  BrowserRouter,
  Route,
  Router,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";
import translate from "../i18nProvider/translate";
import {
  fetchUsersData,
  logoutUser,
  fetchUserDeleteAccount,
  verifyAuthentication,
  verifyRefreshToken,
} from "../redux/Authentication/action";

class Home extends Component {
  render() {
    console.log("sunt in home in render");
    if (!this.props.loaded) {
      if (
        !this.props.client.verifyToken ||
        this.props.client.verifyToken == undefined
      ) {
        console.log("sunt in home in refresh if");
        this.props.verifyRefreshToken();
      } else {
        console.log("sunt in home in verify if");
        this.props.verifyAuthentication(this.props.client.verifyToken);
      }
    }
    if (this.props.loading) {
      console.log("sunt in loading");
      return <h1> Loading... </h1>;
    } else if (!this.props.loading) {
      if (!this.props.isAuth) {
        return (
          <div>
            <Homepage />
          </div>
        );
      } else if (this.props.isAuth) {
        return (
          <div>
            <Dashboard />
          </div>
        );
      }
    }
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
    logoutUser: () => dispatch(logoutUser()),
    fetchUserDeleteAccount: () => dispatch(fetchUserDeleteAccount()),
    verifyRefreshToken: () => dispatch(verifyRefreshToken()),
    verifyAuthentication: (verifyToken) =>
      dispatch(verifyAuthentication(verifyToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
