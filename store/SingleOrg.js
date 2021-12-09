import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from 'expo-constants'

const DOMAIN = constants.manifest.extra.domain

////// Action Types
const SET_ORGANIZATION = "SET_ORGANIZATION";
const UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION";

////// Action Creators
export const setOrganization = (organization) => ({
  type: SET_ORGANIZATION,
  organization,
});

export const _updateOrganization = (organization) => ({
  type: SET_ORGANIZATION,
  organization,
});

////// Async Creators
export const fetchOrganization = (orgId) => {
  return async (dispatch) => {
    // const token = await AsyncStorage.getItem("token");
    const res = await Axios.get(
      `${DOMAIN}api/organizations/${orgId}`
    );
    dispatch(setOrganization(res.data));
  };
};

export const updateOrganization = (org) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const res = await Axios.put(
      `${DOMAIN}api/organizations/`, {updateFields: org}, {
        headers: {
          authorization: token,
        },
      });
    dispatch(_updateOrganization(res.data));
  };
};

//////Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_ORGANIZATION:
      return action.organization;
    case UPDATE_ORGANIZATION: 
      return action.organization;
    default:
      return state;
  }
}
