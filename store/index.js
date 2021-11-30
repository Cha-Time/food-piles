import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
// ^^ StackOverFlow: Avoid to use this logger it causes lots of issues, like performance. Use react-native debugger for logging redux. –

import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import auth from "./auth";
// import users from "./users";
// import cartsReducer from "./cart";
// import productsReducer from "./products";
// import singleProductReducer from "./singleProduct";
// import categoriesReducer from './category'

import homepageViewReducer from "./homepageView";

const reducer = combineReducers({
  homepageView: homepageViewReducer,
});

/* 
is store logging possible in react native? i think not
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);
*/

const store = createStore(reducer);

export default store;
