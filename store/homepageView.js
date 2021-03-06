import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from 'expo-constants'

const DOMAIN = constants.manifest.extra.domain

//Action Types
const SET_HOME_VIEW = "SET_HOME_VIEW";
const GET_HOME_VIEW = "GET_HOME_VIEW";

const SET_TOTAL_FILTERED_ORGS = "SET_TOTAL_FILTERED_ORGS";

const SET_AVAILABILITY = "SET_AVAILABILITY";
const GET_AVAILABILITY = "GET_AVAILABILITY";

//Action Creators
export const setTotalFilteredOrgs = (newCount) => {
  return {
    type: SET_TOTAL_FILTERED_ORGS,
    newCount,
  };
};

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

export const _setAvailability = (newAvailability) => {
  return {
    type: SET_AVAILABILITY,
    newAvailability,
  };
};

const _getAvailability = (toSet) => {
  return {
    type: GET_AVAILABILITY,
    toSet,
  };
};

// Thunks
export const setAvailability = (newAvailability) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const res = await Axios.put(
      `${DOMAIN}api/organizations/availability`,
      { newAvailability: newAvailability },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_setAvailability(newAvailability));
  };
};

export const getAvailability = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const res = await Axios.get(
      `${DOMAIN}api/organizations/availability`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_getAvailability(res.data));
  };
};

//Reducer
const initialState = {
  toggleView: "map",
  availability: false,
  totalFilteredOrgs: 0,
};

export default function homepageViewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_FILTERED_ORGS:
      return { ...state, totalFilteredOrgs: action.newCount };
    case SET_HOME_VIEW:
      return { ...state, toggleView: action.newView };
    case GET_HOME_VIEW:
      return state;
    case SET_AVAILABILITY:
      return { ...state, availability: action.newAvailability };
    case GET_AVAILABILITY:
      return { ...state, availability: action.toSet };
    default:
      return state;
  }
}
