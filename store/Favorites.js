import Axios from "axios";

////// Action Types
const SET_FAVORITES = "SET_FAVORITES";
const ADD_FAVORITE = "ADD_FAVORITE";
const REMOVE_FAVORITE = "REMOVE_FAVORITE";

/////// Action Creators
export const _setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  favorites,
});
export const _addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite,
});
export const _removeFavorite = (favorite) => ({
  type: REMOVE_FAVORITE,
  favorite,
});

////// Async Creators
export const fetchFavorites = () => {
  return async (dispatch) => {
    const res = await Axios.get("https://localhost:8080/api/favorites");
    dispatch(_setFavorites(res.data));
  };
};

export const addFavorite = (orgId) => {
  return async (dispatch) => {
    const res = await Axios.post("https://localhost:8080/api/favorites", {
      orgId,
    });
    dispatch(_addFavorite(res.data));
  };
};

export const removeFavorite = (orgId) => {
  return async (dispatch) => {
    const res = await Axios.delete(
      "https://localhost:8080/api/organizations/favorites",
      {
        orgId,
      }
    );
    dispatch(_removeFavorite(res.data));
  };
};

////// Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.favorites;
    case ADD_FAVORITE:
      return [...state, action.favorite];
    case REMOVE_FAVORITE:
      return [...state.filter((org) => org.id !== action.favorite.id)];
    default:
      return state;
  }
}
