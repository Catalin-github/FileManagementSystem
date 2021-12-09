import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_ERROR,
  EDIT_PROFILE,
  REGISTER_SUCCESS
} from "./actionType";
import axios from "axios"
import { Redirect } from "react-router-dom";
import React, { Component }  from 'react';
import Dashboard from "../../components/Dashboard";
//import { useHistory } from "react-router-dom";
// const history = useHistory();


export const fetchUsersLogin = (data) => {
  return (dispatch) => {
    console.log(data.email)
    console.log(data.password)
    axios({
      method: 'POST',
      url: '/dia-aplication/api/user/login',
      headers: { "Content-Type": "application/json",
    "Access-Control-Allow-Origin":"localhost:3000/" },

      data: {
        email: data.email,
        password: data.password
      },
      credentials:"include"
    }) 
      .then((res) => {
        console.log(res)
        console.log("sadsdsadadadasdasdas")
        if(res.success === false){ 
          throw new Error('Email or password incorect!');
        }       
        console.log("you are in login")
        console.log(res.data)
         console.log(res.data.dataUserResponse)

        dispatch(loginSuccess({ data: res.data.dataUserResponse, success: res.data.success, message:res.data.message }));
      })
      .catch((err) => {
        console.log(err)
        dispatch(loginError("Login Failed, Please Try Again"));
      });
  };
}
// export const fetchUsersLogin = (data) => {
// 	return (dispatch) => {
// 		fetch(`/dia-aplication/api/user/login`, {
// 			method: 'POST',
// 			body: JSON.stringify(data),
// 			headers: { 'Content-Type': 'application/json' },
// 			credentials: 'include',
// 		})
// 			.then((res) => res.json()) ///////////
// 			.then((res) => {
// 				console.log(res);
// 				console.log(res.dataUserResponse);
// 				console.log(res.dataUserResponse.firstName);

// 				if (res.success === false) {
// 					throw new Error('Your data is invalid!');
// 				}
// 				dispatch(
// 					registerSuccess({
// 						data: res.dataUserResponse,
// 						message: res.message,
// 						succes: res.success,
// 					}),
// 				);
// 				//    history.push("/");
// 				// return( <Redirect exact to="/dashboard"/>)
// 				console.log('true');
// 				return true;
// 			})

// 			.catch((err) => {
// 				dispatch(loginError(err));
// 				console.error(err.value);
// 			});
// 	};
// };




export const fetchUsersRegister =   (data) => {
  return  (dispatch) => {

      fetch(`/dia-aplication/api/user/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
       .then((res) => res.json())///////////
      .then((res) => {
 console.log(res)
 console.log(res.dataUserResponse)
 console.log(res.dataUserResponse.firstName)

 if(res.success === false){ 
          throw new Error('Your data is invalid!');
        }      
        dispatch(registerSuccess({ data: res.dataUserResponse, message: res.message, succes:res.success}));
  //    history.push("/");
           // return( <Redirect exact to="/dashboard"/>)    
           console.log("true")
     return true
    })

      .catch((err) => {
        dispatch(loginError(err));
        console.error(err.value);
      });
  };
};


export const verifyAuthentication = ( ) => {
  return (dispatch) => {
  
    fetch(`/dia-aplication/api/user/isAuthenticated`, {
      method: "GET",
      headers: {  "Content-Type": "application/json",   },
      credentials: "include",
    })
      .then((res) => res.json()) 
      .then((res) => {
        console.log(res)
        if (!res.success) {
          throw new Error('You are not authenticated!');
        }

        if (res.success) {
          dispatch(loginSuccess({ data: res.dataUserResponse}));
        }
        if(window.location.pathname === "/account"){
          dispatch(loginRequest() )
        }
      })

      .catch((err) => {       
        console.log(err)
        dispatch(loginError(err));
      });
  };
};

export const verifyRefreshToken = () => {
  return (dispatch) => {
    fetch(`/dia-aplication/api/user/isAuthenticated`, {
      mothod: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
   
        const user = { data: res.dataUserResponse  };

        if (res.verifyToken) {
          dispatch(loginSuccess(user));
        }
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    fetch("/dia-aplication/api/user/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
    .then((res) => res.json())
      .then((res) => {
        console.log("here");
        if (res.success == true) {
          dispatch(loginError(res.message));
        }
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  };
};

export const fetchUsersEditProfile = (data) => {

  return (dispatch) => {
console.log("edit ")
    fetch(`/dia-aplication/api/user/update`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success === false){ 
          throw new Error('Your data is invalid!');
        }     
        if(res.success==true){}
        dispatch(loginSuccess({ data: res.dataUserResponse }));

   
        dispatch(editProfile());
      })
      .catch((err) => {

        dispatch(loginError(err));
      });
  };
};

export const changePassword = (data) => {
  return (dispatch) => {
    fetch(`/dia-aplication/api/user/reset-password?token=${data.token}`, {
      method: "POST",
      body: JSON.stringify({password:data.password}),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loginError());
        
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  };
};


export const requestChangePassword = (email) => {
  return (dispatch) => {
    fetch(`/dia-aplication/api/user/request-reset-password`, {
      method: "POST",
      body: JSON.stringify({email:email}),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loginError());
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  };
};

export const fetchLoginGoogle = (res) => {
  console.log("res")
  console.log(res.tokenId)
  console.log(res.profileObj.email)
  return (dispatch) => {
    axios({
      method: 'POST',
       url: '/dia-aplication/api/user/google',
        headers: { "Content-Type": "application/json"},
      data: { email:res.profileObj.email,
              token:res.tokenId  } ,
      credentials: "include"
    }) 
      .then((res) => {
        console.log(res)      
        console.log("you are in logi22222")
        console.log(res.data)
        console.log(res.data.user)
        console.log(res.data.dataUserResponse)
  dispatch(loginSuccess({ data: res.data.dataUserResponse, success: res.success, message:res.data.message }));
      })
      .catch((err) => {
        console.log(err+ "you are here")
        console.log("dssssssssssssssssssssssssssssssssssyou are here")
        dispatch(loginError("Login Failed, Please Try Again"));
      });
  };
};

export const fetchLoginFacebook = (res) => {
  console.log(res.accessToken)
  return (dispatch) => {  
    fetch("/dia-aplication/api/user/facebook", {
      method: "POST",
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({email:res.email,
                            firstName:res.name.split(" ")[0],
                            lastName:res.name.split(" ")[1],
                            token:res.accessToken}),
      credentials: "include",
    })
      .then((res) =>{   
      return res.json()
      })
      .then((res) => {
        console.log("faaacebooook")
        if(res.success === false || res.message === ""){ 
          throw new Error('Email or password incorect!');
        }
        dispatch(loginSuccess({ data: res.dataUserResponse, success: res.success, message:res.message }))
             
       })
      .catch((err) => {
        console.log(err)
        dispatch(loginError("Login Failed, Please Try Again"));
      });
  };
};



export const AccountRequest = (email) => {
  console.log("before acc")
  return (dispatch) => {
      fetch(`/dia-aplication/api/user/account`, {
      method: "POST",
      body: JSON.stringify(email),
       headers: {  "Content-Type": "application/json"},
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("accccc")
        if(res.success==false){
          throw new Error('my error');
         }
        console.log(res.dataUserResponse)
        dispatch(loginSuccess({ data: res.dataUserResponse ,success: res.success}));

   
      })
      .catch((err) => {

      console.log(err.message)
        dispatch(loginError(err));
      });
  };
};


export const fetchUserDeleteAccount = (verifyToken) => {
  return (dispatch) => {
    fetch(`http://localhost:5000/MyAccount`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Baerer ${verifyToken}`,
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch(editProfile());

        dispatch(loginError());
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (res) => {
  return {
    type: LOGIN_SUCCES,
    payload: res,
  };
};

export const loginError = (err) => {
  return {
    type: LOGIN_ERROR,
    payload: err,
  };
};

export const editProfile = () => {
  return {
    type: EDIT_PROFILE,
  };
};
export const registerSuccess = (res) => {
  return {
    type: REGISTER_SUCCESS,
    payload: res,
  };
};

// export const resetValidation=()=>{
//   return{
//     type:RESET_VALIDATION
//   }
// }

// export const fetchUsersData = (data) => {
//   return (dispatch) => {
//     dispatch(loginRequest());
//     fetch("http://localhost:5000/MyAccount", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         dispatch(loginSuccess(data));
//       })
//       .catch((err) => {
//         dispatch(loginError());
//       });
//   };
// };



// export const fetchUsersRegister_GET = (data) => {
//   return (dispatch) => {

//     fetch(`http://localhost:5000/register`, {
//       method: "GET",
//       body: JSON.stringify(),
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           dispatch(loginSuccess(data));
//         } else {
//           console.log(res);
//           const error = new Error(res);
//           throw error;
//         }
//       })
//       .catch((err) => {
//         dispatch(loginError(err));
//       });
//   };
// };
