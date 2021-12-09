import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  changePassword,loginRequest } from "../redux/Authentication/action";
import { connect } from "react-redux";


class ResetPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        password: "",
        password_confirm: "",
      };
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };  
    handleSubmit = (e) => {
        e.preventDefault();
         const data={
            token: this.props.match.params.id,
            password:this.state.password,
            passwordConfirm:this.state.password_confirm
        }
        if(this.state.password==this.state.password_confirm){
            this.props.changePassword(data)
            this.props.history.push("/login")
        }
      }; 
      render() {
        return (
          <div>
               <h1>Reset your password</h1>
               <form onSubmit={this.handleSubmit}>
               <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}

                     />
                  </div>
                  <div>
                    <label htmlFor="PasswordConfirm">PasswordConfirm</label>
                    <input
                      type="password"
                      placeholder="PasswordConfirm"
                      name="password_confirm"
                      onChange={this.handleChange}

                     />
                  </div>
                   
                 
                <button type="submit">Submit</button>
                </form>      
                  <Link to="/"> Home </Link> 
               
              </div>
         
       
        );
    
      }
      
    };
    const mapStateToProps = (state) => {
        return { 
          isNotLogged: state.users.isAuth,
        };
      };
      
      const mapDispatchToProps = (dispatch) => {
        return {
          changePassword: (data) => dispatch(changePassword(data)), 
          loginRequest: () => dispatch(loginRequest()), 
        };
      };
      export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
























