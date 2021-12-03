import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = await AsyncStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("https://foodpiles.herokuapp.com/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (input, method) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://foodpiles.herokuapp.com/auth/${method}`,
      input
    );
    await AsyncStorage.setItem(TOKEN, res.data.token);
    await dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN);
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
