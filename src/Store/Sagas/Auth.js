import { put } from "redux-saga/effects";
import * as actions from "../Action/Index";
import { delay } from "redux-saga/effects";
import axios from "axios";

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  const authdata = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKsUAG8QcCVDXSwnWL7mDlieazcUU9UJ4";

  if (action.isSignup) {
    URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKsUAG8QcCVDXSwnWL7mDlieazcUU9UJ4";
  }

  // yield put(actions.authStart());
  try {
    const response = yield axios.post(URL, authdata);
    const expitationTime = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("expirationTime", expitationTime);
    localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error.message));
  }
}

export function* checkEmailsaga(action) {
  // return dispatch => {
  //   const URL =
  //     "https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_3XFBiTWZRKylHrVQODeCa0CJrzaS6&emailAddress=" +
  //     email;
  //   axios.get(URL).then(response => {
  //     console.log(response)
  //     dispatch(auth(email, password, isSignup));
  //   });

  const URL =
    "https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_3XFBiTWZRKylHrVQODeCa0CJrzaS6&emailAddress=" +
    action.email;
    yield put(actions.authStart());

    try {
    const response = yield axios.get(URL);
    const result =
      response.data.formatCheck === "true" &&
      response.data.smtpCheck === "true" &&
      response.data.dnsCheck === "true" &&
      response.data.freeCheck === "true" &&
      response.data.disposableCheck === "false" &&
      response.data.catchAllCheck === "false";

    console.log(result, response);
    if (result) {
      yield put(actions.auth(action.email, action.password, action.isSignup));
    } else {
      yield put(actions.authFail("Not a Valid email please try again"));
    }
  } catch (error) {}

  // yield put(actions.auth(action.email,action.password,action.isSignup));
}
