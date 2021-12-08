import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

////// Action Types
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

////// Action Creators
export const setUser = (user) => ({ type: SET_USER, user });
export const _updateUser = (user) => ({ type: UPDATE_USER, user });

////// Async Creators
export const fetchUser = (userId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const { data: user } = await Axios.get(`https://foodpiles.herokuapp.com/api/users/${userId}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(setUser(user));
  };
};

export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const { data: user } = await Axios.put(`https://foodpiles.herokuapp.com/api/users/`, {updateFields: updatedUser}, {
      headers: {
        authorization: token,
      },
    });
    dispatch(updateUser(user));
  };
};

//////Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user
    default:
      return state;
  }
}
