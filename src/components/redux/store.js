import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const composeEnhancers = composeWithDevTools({});
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
