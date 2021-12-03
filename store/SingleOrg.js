import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

////// Action Types
const SET_ORGANIZATION = "SET_ORGANIZATION";

////// Action Creators
export const setOrganization = (organization) => ({
  type: SET_ORGANIZATION,
  organization,
});

////// Async Creators
export const fetchOrganization = (orgId) => {
  return async (dispatch) => {
    // const token = await AsyncStorage.getItem("token");
    const res = await Axios.get(
      `https://foodpiles.herokuapp.com/api/organizations/${orgId}`
    );
    console.log(res.data);
    dispatch(setOrganization(res.data));
  };
};

//////Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_ORGANIZATION:
      return action.organization;
    default:
      return state;
  }
}
