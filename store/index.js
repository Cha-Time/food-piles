import { createStore, combineReducers, applyMiddleware } from "redux";
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

import homepageViewReducer from "./homepageView";
import mapDataReducer from "./MapData";

const reducer = combineReducers({
  homepageView: homepageViewReducer,
  mapData: mapDataReducer,
});

const middleware = applyMiddleware(thunkMiddleware.withExtraArgument({ axios }))

const store = createStore(reducer, middleware);

export default store;
