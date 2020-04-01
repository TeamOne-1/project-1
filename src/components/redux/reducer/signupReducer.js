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

const SignupReducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.IS_SIGNUP_START:
      return start(state, action);
    case actionTypes.IS_SIGNUP_SUCCESS:
      return success(state, action);
    case actionTypes.IS_SIGNUP_FAIL:
      return fail(state, action);
    // case actionTypes.IS_LOG_OUT:
    //   return logout(state, action);
    default:
      return state;
  }
};

export default SignupReducer;
