import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

////// Action Types
const SET_USER = "SET_USER";

////// Action Creators
export const setUser = (user) => ({ type: SET_USER, user });

////// Async Creators
export const fetchUser = (userId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const { data: user } = await Axios.get(`/api/users/${userId}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(setUser(user));
  };
};

//////Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
