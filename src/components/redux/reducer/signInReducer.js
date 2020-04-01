import * as actionTypes from "../actions/actionTypes";

const initial = {
  authorized: false,
  token: null,
  error: null,
  success: false
};

const start = (state, action) => {
  return {
    ...state,
    loading: true,
    success: false,
    authorized: false
  };
};

const success = (state, action) => {
  console.log("action.token", action.token);
  return {
    ...state,
    loading: false,
    success: true,
    authorized: true,
    token: action.token
  };
};

const fail = (state, action) => {
  return {
    ...state,
    loading: false,
    success: false,
    authorized: false,
    error: action.error
  };
};

const logout = (state, action) => {
  return {
    ...state,
    loading: false,
    success: false,
    authorized: false,
    token: null
  };
};

const SignInReducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.IS_SIGNIN_START:
      return start(state, action);
    case actionTypes.IS_SIGNIN_SUCCESS:
      return success(state, action);
    case actionTypes.IS_SIGNIN_FAIL:
      return fail(state, action);
    case actionTypes.IS_SIGN_OUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default SignInReducer;
