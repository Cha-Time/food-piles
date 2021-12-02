import axios from 'axios';

const GET_MESSAGES = 'GET_MESSAGES';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

const getMessages = messages => {
  return {
    type: GET_MESSAGES,
    messages,
  };
};

export const writeMessage = inputContent => {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent,
  };
};

export const gotNewMessageFromServer = message => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message,
  };
};

export const fetchMessages = () => async dispatch => {
  // const { data: messages } = await axios.get('/api/messages');
  const { data: messages } = await axios.get('http://192.168.1.7:8080/api/messages');
  dispatch(getMessages(messages));
};

const initialState = {
  messages: [],
  NewMessageEntry: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};
