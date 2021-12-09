import React from "react";
import { Link } from "react-router-dom";
import Email from "./../images/email.png"
import { connect } from "react-redux";
import {   loginRequest} from "../redux/Authentication/action";
const EmailConfirmation = ({loginRequest}) => {
  
 
  return (
    <div className="email-confirmation">
        <img src={Email} className="email"    />
         <div class="email-text"> 
         <p>A confirmation link has been sent to you</p>
              <p>--- Please check your email address!---</p>
                  <Link to="/login" className="link-home" ><button onClick={loginRequest}> Back to login page!</button></Link>
        </div> 
    </div>
  );
};
const mapStateToProps = (state) => {
  return { 
    register:state.users.register,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { 
    loginRequest: () => dispatch(loginRequest()), 
  };
};
export default  connect(mapStateToProps,mapDispatchToProps)(EmailConfirmation);
