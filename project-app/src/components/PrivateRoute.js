import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import {
  verifyAuthentication,
  verifyRefreshToken,AccountRequest
} from "../redux/Authentication/action";

const PrivateRoute = ({
  verifyAuthentication,
  verifyRefreshToken,
  AccountRequest,
  isAuth,
  loaded,
  client,
  edit,
  loading,
  component: Component,
  ...rest
}) => {
  console.log(client.data)
  console.log(!loaded)
console.log(window.location.pathname === "/account")
  if (window.location.pathname === "/account" && client.data && !loaded) {
    AccountRequest(client.data);
  } else  if(!loaded ) {
     
    verifyAuthentication();    }
 
console.log("kkkkkk")
console.log(client.data==undefined)

  if (loading) {
     return <h1>Loading...</h1>;
   } else if (!loading) {
    
  
    return ( 

      <Route
        {...rest}
        component={(props) =>
          isAuth ? <Component {...props} /> : <Redirect exact to="/" />
        }
      />
    );
  }
};

const mapStatetoProps = (state) => ({
  isAuth: state.users.isAuth,
  locales: state.locale.lang,
  loaded: state.users.loaded,
  client: state.users.user,
  edit: state.users.edit,
  loading: state.users.loading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    verifyRefreshToken: () => dispatch(verifyRefreshToken()),
    verifyAuthentication: () =>
      dispatch(verifyAuthentication()),
      AccountRequest: (data) => dispatch(AccountRequest(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(PrivateRoute);
