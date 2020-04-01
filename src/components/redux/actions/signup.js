import * as actionTypes from "./actionTypes";
export const signup = authData => {
  console.log("authData", authData);
  return dispatch => {
    dispatch(start());
    const signupData = {
        fullName: authData.user.fullName,
        userName: authData.user.userName,
        email: authData.user.email,
        password: authData.user.password,
        confirmPassword: authData.user.confirmPassword
      },
      url = "http://localhost:8080/KoreraProject3/";

    let userArr = JSON.parse(localStorage.getItem("token")) || [];
    //  let userArr = JSON.parse(url)

    console.log("userArr", userArr, signupData);
    const errorFound = userArr.find(user => user.email === signupData.email);
    if (errorFound) {
      dispatch(fail("user name already exist"));
    } else {
      userArr.push(signupData);
      localStorage.setItem("token", JSON.stringify(userArr));
      authData.history.push("/");
      // axios.post(url, { signupData });
      dispatch(success(userArr));
    }
  };
};

export const start = () => {
  return {
    type: actionTypes.IS_SIGNUP_START
  };
};

export const success = token => {
  return {
    type: actionTypes.IS_SIGNUP_SUCCESS,
    token: token
  };
};

export const fail = error => {
  return {
    type: actionTypes.IS_SIGNUP_FAIL,
    error: error
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.IS_SET_REDIRECT_PATH,
    path: path
  };
};
