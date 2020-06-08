import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

//ACTION
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const USER_SET = 'USER_SET';
const GET_CHANNELS = 'GET_CHANNELS';
const GET_CHANNEL = 'GET_CHANNEL';

//ACTION CREATORS
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

export const getChannels = (channels) => ({
  type: GET_CHANNELS,
  channels,
});

export const getChannel = (channel) => ({
  type: GET_CHANNEL,
  channel,
});

// THUNKS
export const fetchMessages = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages);
    dispatch(action);
  };
};

export const fetchChannels = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/channels');
    const channels = response.data;
    dispatch(getChannels(channels));
  };
};

export const sendMessage = (message) => async (dispatch, getState) => {
  message.name = getState().user;
  const { data: newMessage } = await axios.post('/api/messages', message);
  dispatch(gotNewMessage(newMessage));
  socket.emit('new-message', newMessage);
};

export const postChannel = (channel) => {
  return async (dispatch) => {
    const data = { channel: channel };
    const response = await axios.post('/api/channels', data);
    const newChannel = response.data;
    dispatch(getChannel(newChannel));
  };
};

const initialState = {
  messages: [],
  newMessageEntry: '',
  user: 'Bailey',
  channels: [],
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
    case GET_CHANNEL:
      return { ...state, channels: [...state.channels, action.channel] };
    case GET_CHANNELS:
      return { ...state, channels: action.channels };
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);
export default store;
