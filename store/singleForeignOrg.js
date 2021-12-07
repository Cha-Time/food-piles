import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

////// Action Types
const SET_FOREIGN_ORGANIZATION = "SET_FOREIGN_ORGANIZATION";

////// Action Creators
export const setForeignOrganization = (organization) => ({
  type: SET_FOREIGN_ORGANIZATION,
  organization,
});

////// Async Creators
export const fetchForeignOrganization = (orgId) => {
  return async (dispatch) => {
    // const token = await AsyncStorage.getItem("token");
    const res = await Axios.get(
      `https://foodpiles.herokuapp.com/api/organizations/${orgId}`
    );
    dispatch(setForeignOrganization(res.data));
  };
};

//////Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_FOREIGN_ORGANIZATION:
      return action.organization;
    default:
      return state;
  }
}
