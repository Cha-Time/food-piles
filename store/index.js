import { createStore, combineReducers } from "redux";

import homepageViewReducer from "./homepageView";
import mapDataReducer from "./MapData";

const reducer = combineReducers({
  homepageView: homepageViewReducer,
  mapData: mapDataReducer,
});

const store = createStore(reducer);

export default store;
