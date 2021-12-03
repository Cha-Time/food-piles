import axios from "axios";

const GET_MESSAGES = "GET_MESSAGES";
const SEND_MESSAGE = "SEND_MESSAGE";

////// Action Creators
export const getMessages = (messages) => ({type: GET_MESSAGES, messages})
export const _sendMessage = (newMessage) => ({type: SEND_MESSAGE, newMessage})

////// Async Creators
export const fetchMessages = () => {
  return async () => {
    const { data: messages } = await axios.get("https://foodpiles.herokuapp.com/api/messages");
    dispatch(getMessages(messages));
  }
};

export const sendMessage = (message, userId, recId) => {
  return async () => {
    const {data: sent} = await axios.post("https://foodpiles.herokuapp.com/api/messages", {
      message, 
      userId, 
      recId
    })
    dispatch(_sendMessage(sent))
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case SEND_MESSAGE:
      return [...state, action.newMessage]
    default:
      return state;
  }
};
