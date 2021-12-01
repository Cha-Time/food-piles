//Action Types
const SET_HOME_VIEW = "SET_HOME_VIEW";
const GET_HOME_VIEW = "GET_HOME_VIEW";

//Action Creators
export const setHomeView = (newView) => {
  return {
    type: SET_HOME_VIEW,
    newView,
  };
};

export const getHomeView = () => {
  return {
    type: GET_HOME_VIEW,
  };
};

// Thunks

//Reducer
const initialState = { toggleView: "map" };

export default function homepageViewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOME_VIEW:
      return { ...state, toggleView: action.newView };
    case GET_HOME_VIEW:
      return state;
    default:
      return state;
  }
}
