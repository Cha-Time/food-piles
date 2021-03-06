import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from 'expo-constants'

const DOMAIN = constants.manifest.extra.domain

const GET_MESSAGES = "GET_MESSAGES";
const SEND_MESSAGE = "SEND_MESSAGE";
const CLEAR_MESSAGES = "CLEAR_MESSAGES";

////// Action Creators
export const getMessages = (messages) => ({ type: GET_MESSAGES, messages });
export const _sendMessage = (newMessage) => ({
  type: SEND_MESSAGE,
  newMessage,
});
export const _clearMessages = () => ({ type: CLEAR_MESSAGES });

////// Async Creators
export const fetchMessages = (receiverId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const { data: messages } = await Axios.get(
      `${DOMAIN}api/messages/chat/${receiverId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(getMessages(messages));
  };
};

export const sendMessage = (messageText, receiverId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const { data: sent } = await Axios.post(
      `${DOMAIN}api/messages`,
      {
        messageText,
        receiverId,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_sendMessage(sent));
  };
};

export const clearMessages = () => {
  return async (dispatch) => {
    dispatch(_clearMessages());
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case SEND_MESSAGE:
      return [...state, action.newMessage];
    case CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
}
