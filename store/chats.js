import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

////// Action Types
const SET_CHATS = "SET_CHATS";

////// Action Creators
export const setChats = (chats) => ({ type: SET_CHATS, chats });

////// Async Creators
export const fetchChats = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const { data: chats } = await Axios.get(`https://foodpiles.herokuapp.com/api/messages/all-chats`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(setChats(chats));
  };
};

//////Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_CHATS:
        let chats = []
      for (let key in action.chats) {
        chats.push({id: key, msg: action.chats[key]})
      }
      return chats
    default:
      return state;
  }
}
