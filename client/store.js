import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const USER_SET = 'USER_SET';

export const gotMessagesFromServer = (messages) => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
});

export const gotNewMessage = (message) => ({
  type: GOT_NEW_MESSAGE,
  message,
});

export const writeMessage = (inputContent) => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputContent,
});

export const gotNewMessageFromServer = (message) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message,
});

export const userSet = (userName) => ({
  type: USER_SET,
  payload: userName,
});

export const fetchMessages = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages);
    dispatch(action);
  };
};

export const sendMessage = (message) => async (dispatch, getState) => {
  message.name = getState().user;
  const { data: newMessage } = await axios.post('/api/messages', message);
  dispatch(gotNewMessage(newMessage));
  socket.emit('new-message', newMessage);
};

const initialState = {
  messages: [],
  newMessageEntry: '',
  user: 'Bailey',
};

const reducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case GOT_NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] };
    case USER_SET:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);
export default store;
