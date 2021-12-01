import Axios from "axios";

////// Action Types
const SET_ORGANIZATIONS = "SET_ORGANIZATIONS";

/////// Action Creators
export const setOrganizations = (organizations) => ({
  type: SET_ORGANIZATIONS,
  organizations,
});

////// Async Creators
export const fetchOrganizations = () => {
  return async (dispatch) => {
    const res = await Axios.get(
      "https://foodpiles.herokuapp.com/api/organizations"
    );
    dispatch(setOrganizations(res.data));
  };
};

////// Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_ORGANIZATIONS:
      return action.organizations;
    default:
      return state;
  }
}
