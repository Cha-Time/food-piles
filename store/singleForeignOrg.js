import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from 'expo-constants'

const DOMAIN = constants.manifest.extra.domain

////// Action Types
const SET_FOREIGN_ORGANIZATION = "SET_FOREIGN_ORGANIZATION";
const CLEAR_FOREIGN_ORGANIZATION = "CLEAR_FOREIGN_ORGANIZATION";

////// Action Creators
export const setForeignOrganization = (organization) => ({
  type: SET_FOREIGN_ORGANIZATION,
  organization,
});

export const _clearForeignOrganization = () => ({
  type: CLEAR_FOREIGN_ORGANIZATION,
});

////// Async Creators
export const fetchForeignOrganization = (orgId) => {
  return async (dispatch) => {
    // const token = await AsyncStorage.getItem("token");
    const res = await Axios.get(
      `${DOMAIN}api/organizations/${orgId}`
    );
    dispatch(setForeignOrganization(res.data));
  };
};

export const clearForeignOrganization = () => {
  return async (dispatch) => {
    dispatch(_clearForeignOrganization());
  };
};

//////Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_FOREIGN_ORGANIZATION:
      return action.organization;
    case CLEAR_FOREIGN_ORGANIZATION:
      return {};
    default:
      return state;
  }
}
