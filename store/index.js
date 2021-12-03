import { createStore, combineReducers, applyMiddleware } from "redux";
import axios from "axios";
import thunkMiddleware from "redux-thunk";

import homepageViewReducer from "./homepageView";
import mapDataReducer from "./MapData";
import authReducer from "./auth";
import singleUserReducer from "./SingleUser";
import singleOrgReducer from "./SingleOrg";
import messagesReducer from './messages';

const reducer = combineReducers({
  homepageView: homepageViewReducer,
  mapData: mapDataReducer,
  auth: authReducer,
  singleUser: singleUserReducer,
  singleOrg: singleOrgReducer,
  messages: messagesReducer,
});

const middleware = applyMiddleware(
  thunkMiddleware.withExtraArgument({ axios })
);

const store = createStore(reducer, middleware);

export default store;
