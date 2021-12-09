

import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { verifyAuthentication, verifyRefreshToken} from "../redux/Authentication/action";

const PublicRoute = ({
  isAuth,
  loaded,
  loading,
  client,
  verifyAuthentication,
  component: Component,
  ...rest
}) => {
  if (!loaded) {
    verifyAuthentication();
  }
  if (loading) {
    return <h1>Loading... </h1>;
  } else if (!loading) {
    return (
      <Route
        {...rest}
        component={(props) =>
          !isAuth ? <Component {...props} /> : <Redirect to="/dashboard" />
        }
      />
    );
  }
};

const mapStatetoProps = (state) => ({
  isAuth: state.users.isAuth,
  locales: state.locale.lang,
  client: state.users.user,
  loaded: state.users.loaded,
  loading: state.users.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    verifyRefreshToken: () => dispatch(verifyRefreshToken()),

    verifyAuthentication: () =>
      dispatch(verifyAuthentication()),

  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(PublicRoute);
