import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// import logger from 'redux-logger'
import rootReducer from "../redux/reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk
      //  logger
    )
  )
);

export default store;
