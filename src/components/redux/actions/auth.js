import * as actionTypes from "./actionTypes";

export const signIn = loginData => {
  console.log("loginData", loginData);
  return dispatch => {
    dispatch(start());

    let isLogin = JSON.parse(localStorage.getItem("token"));
    let userFound =
      isLogin &&
      isLogin.find(
        u =>
          u.email === loginData.user.email &&
          u.password === loginData.user.password
      );
    console.log("isLoginnnnnn", isLogin);
    console.log(userFound, "my user found");
    if (userFound) {
      loginData.history.push("/resource");
      localStorage.setItem("loginToken", true);
      success(loginData.user);
    } else {
      loginData.user.errors.password = "email and password don't match";
      fail("email and password don't match");
      alert("email and password don't match");
    }
  };
};

export const start = () => {
  return {
    type: actionTypes.IS_SIGNIN_START
  };
};

export const success = token => {
  return {
    type: actionTypes.IS_SIGNIN_SUCCESS,
    token: token
  };
};

export const fail = error => {
  return {
    type: actionTypes.IS_SIGNIN_FAIL,
    error: error
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.IS_SET_REDIRECT_PATH,
    path: path
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.IS_SIGN_OUT
  };
};
