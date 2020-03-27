import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// import logger from 'redux-logger'
import rootReducer from "../redux/reducer/rootReducer";

// const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk
    //  logger
  )
);

export default store;
