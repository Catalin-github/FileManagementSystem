import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { setLocales } from "../redux/Language/action";
import { I18nProvider, LOCALES } from "../i18nProvider";
import {
  Link,
  NavLink,
} from "react-router-dom";
import translate from "../i18nProvider/translate";
import { requestChangePassword } from "../redux/Authentication/action";


class ChangePassword extends Component {
      
    constructor(props) {
        super(props);
        this.state = {
          email: '',
        };
      }
      handleSubmit = (e) => {
        e.preventDefault(); 
        this.props.requestChangePassword(this.state.email)
        this.props.history.push("/login")
      };
     handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };  

  render() {

  
      return (
          <div>
        <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            <h2>Change password:</h2>
          </legend>
          <div>
            <label htmlFor="email">Emai</label>
            <input
              value={this.state.email}
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={this.handleChange}
            />
          </div> 
            <button type="submit">Submit</button>
            <Link to="/">Cancel</Link>
         </fieldset>
      </form>
    </div>
      
      );
    
      }
}
const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (lang) => dispatch(setLocales(lang)),
    requestChangePassword: (data) => dispatch(requestChangePassword(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
