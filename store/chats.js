import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from 'expo-constants'

const DOMAIN = constants.manifest.extra.domain

////// Action Types
const SET_CHATS = "SET_CHATS";

////// Action Creators
export const setChats = (chats) => ({ type: SET_CHATS, chats });

////// Async Creators
export const fetchChats = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const { data: chats } = await Axios.get(
      `${DOMAIN}api/messages/all-chats`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(setChats(chats));
  };
};

//////Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_CHATS:
      let chats = [];
      for (let key in action.chats) {
        let date = new Date(`${action.chats[key][1]}`);
        chats.push({
          id: key,
          msg: action.chats[key][0],
          msgTime: date,
          orgName: action.chats[key][2],
        });
      }

      const sortedChats = chats
        .map((chat) => chat)
        .sort(function (a, b) {
          return b.msgTime.valueOf() - a.msgTime.valueOf();
        });
      return sortedChats;
    default:
      return state;
  }
}
