import * as actionType from "./Actiontype";
import axios from "axios";

export const auth = (email, password, isSignup) => {
  // const authdata = {
  //   email: email,
  //   password: password,
  //   returnSecureToken: true
  // };

  // let URL =
  //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKsUAG8QcCVDXSwnWL7mDlieazcUU9UJ4";

  // if (isSignup) {
  //   URL =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKsUAG8QcCVDXSwnWL7mDlieazcUU9UJ4";
  // }
  // return dispatch => {
  //   dispatch(authStart());
  //   axios
  //     .post(URL, authdata)
  //     .then(response => {
  //       // console.log(response.data);
  //       dispatch(authSuccess(response.data.idToken, response.data.localId));
  //       dispatch(checkAuthTimeout(response.data.expiresIn));
  //     })
  //     .catch(error => {
  //       // console.log(error.response.data.error.message);
  //       dispatch(authFail(error.response.data.error.message));
  //     });
  // };

  return {
    type: actionType.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  };
};

export const checkEmail=(email,password,isSignup)=>{
  return{
    type:actionType.CHECK_EMAIL,
    email:email,
    password:password,
    isSignup:isSignup
  }
// return dispatch=>{
//   const URL ="https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_3XFBiTWZRKylHrVQODeCa0CJrzaS6&emailAddress=" +email;
//   axios.get(URL).then(res=>{
//     console.log(res);})
// }

}

export const checkAuthTimeout = expireTime => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(authLogout());
  //   }, expireTime * 1000);
  // };
  return {
    type: actionType.AUTH_CHECK_TIMEOUT,
    expirationTime: expireTime
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return { type: actionType.AUTH_LOGOUT };
};

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};

export const authSuccess = (idtoken, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    idtoken: idtoken,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};

export const setAuthRedirect = path => {
  return {
    type: actionType.SET_AUTH_REDIRECT,
    path: path
  };
};

export const autoCheckStatus = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime >= new Date()) {
        dispatch(
          authSuccess(
            localStorage.getItem("token"),
            localStorage.getItem("userId")
          )
        );
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};
