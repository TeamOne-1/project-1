import { combineReducers } from "redux";
import SignupReducer from "./signupReducer";
import SignInReducer from "./signInReducer";

const rootReducer = combineReducers({
  signup: SignupReducer,
  signIn: SignInReducer
});

export default rootReducer;
