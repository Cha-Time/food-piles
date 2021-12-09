import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from 'expo-constants'

const DOMAIN = constants.manifest.extra.domain

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
    const token = await AsyncStorage.getItem("token");
    const res = await Axios.get(
      `${DOMAIN}api/favorites`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_setFavorites(res.data));
  };
};

export const addFavorite = (orgId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const res = await Axios.post(
      `${DOMAIN}api/favorites`,
      {
        orgId,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_addFavorite(res.data));
  };
};

export const removeFavorite = (orgId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const res = await Axios.delete(
      `${DOMAIN}api/favorites`,
      {
        data: { orgId },
        headers: {
          authorization: token,
        },
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
