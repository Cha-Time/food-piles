import Axios from "axios";
import constants from 'expo-constants'

const DOMAIN = constants.manifest.extra.domain

////// Action Types
const SET_ORGANIZATIONS = "SET_ORGANIZATIONS";
const CREATE_ORGANIZATION = "CREATE_ORGANIZATION";
const REMOVE_ORGANIZATION = "REMOVE_ORGANIZATION";
const UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION";

/////// Action Creators
export const setOrganizations = (organizations) => ({
  type: SET_ORGANIZATIONS,
  organizations,
});
export const _createOrg = (organization) => ({
  type: CREATE_ORGANIZATION,
  organization,
});
export const _removeOrg = (organization) => ({
  type: REMOVE_ORGANIZATION,
  organization,
});
export const _updateOrg = (organization) => ({
  type: UPDATE_ORGANIZATION,
  organization,
});

////// Async Creators
export const fetchOrganizations = (accType) => {
  if (accType == "donor") {
    return async (dispatch) => {
      const res = await Axios.get(
        `${DOMAIN}api/charities`
      );
      dispatch(setOrganizations(res.data));
    };
  }
  if (accType == "charity") {
    return async (dispatch) => {
      const res = await Axios.get(`${DOMAIN}api/donors`);
      dispatch(setOrganizations(res.data));
    };
  }
};

export const createOrganization = (org) => {
  return async (dispatch) => {
    const res = await Axios.post(
      `${DOMAIN}api/organizations`,
      org
    );
    dispatch(_createOrg(res.data));
  };
};

export const removeOrganization = (orgId) => {
  return async (dispatch) => {
    const res = await Axios.delete(
      `${DOMAIN}api/organizations/${orgId}`
    );
    dispatch(_removeOrg(res.data));
  };
};

export const updateOrganization = (org) => {
  return async (dispatch) => {
    const res = await Axios.put(
      `${DOMAIN}api/organizations/${org.id}`,
      org
    );
    dispatch(_updateOrg(res.data));
  };
};

////// Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_ORGANIZATIONS:
      return action.organizations;
    case CREATE_ORGANIZATION:
      return [...state, action.organization];
    case REMOVE_ORGANIZATION:
      return [...state.filter((org) => org.id !== action.organization.id)];
    case UPDATE_ORGANIZATION:
      return state.map((org) =>
        org.id === action.organization.id ? action.organization : org
      );
    default:
      return state;
  }
}
