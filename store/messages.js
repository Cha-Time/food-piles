import axios from 'axios';

const GET_MESSAGES = 'GET_MESSAGES';

const getMessages = messages => {
  return {
    type: GET_MESSAGES,
    messages,
  };
};

export const fetchMessages = () => async dispatch => {
  // const { data: messages } = await axios.get('/api/messages');
  const { data: messages } = await axios.get('http://192.168.1.7:8080/api/messages');
  dispatch(getMessages(messages));
  // dispatch(setOrganizations(res.data));
};

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};
