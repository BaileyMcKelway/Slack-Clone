import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

//ACTION
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_DIRECT = 'GOT_DIRECT';
const GOT_NEW_DIRECT = 'GOT_NEW_DIRECT';
const USER_SET = 'USER_SET';
const GET_USERS = 'GET_USERS';
const GET_CHANNELS = 'GET_CHANNELS';
const GET_CHANNEL = 'GET_CHANNEL';
const ADD_LIKE = 'ADD_LIKE';
const ADD_SAVED = 'ADD_SAVED';
const GET_SAVED = 'GET_SAVED';
const ADD_EMOJI = 'ADD_EMOJI';

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

export const gotDirect = (messages) => ({
  type: GOT_DIRECT,
  messages,
});

export const gotNewDirect = (message) => ({
  type: GOT_NEW_DIRECT,
  message,
});

export const userSet = (user) => ({
  type: USER_SET,
  payload: user,
});

export const getUsers = (users) => ({
  type: GET_USERS,
  users,
});

export const getChannels = (channels) => ({
  type: GET_CHANNELS,
  channels,
});

export const getChannel = (channel) => ({
  type: GET_CHANNEL,
  channel,
});

export const addLike = (messageid) => ({
  type: ADD_LIKE,
  messageid,
});

export const addSaved = (messageId) => ({
  type: ADD_SAVED,
  messageId,
});

export const getSaved = (messages) => ({
  type: GET_SAVED,
  messages,
});

export const addEmoji = (messageid, emoji) => ({
  type: ADD_EMOJI,
  messageid,
  emoji,
});

// THUNKS
export const createUser = (name) => async (dispatch) => {
  const user = await axios.post('/api/authors', { name: name });

  dispatch(userSet(user.data[0]));
  // socket.emit('new-message', newMessage);
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/authors');
    const users = response.data;
    const action = getUsers(users);
    dispatch(action);
  };
};

export const fetchDirects = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/directs');
    const messages = response.data;

    const action = gotDirect(messages);
    dispatch(action);
  };
};

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
  if (message.type === 'message') {
    message.name = getState().user.name;
    const { data: newMessage } = await axios.post('/api/messages', message);
    console.log(newMessage, 'MAIN');
    dispatch(gotNewMessage(newMessage));
    socket.emit('new-message', newMessage);
  } else if (message.type === 'direct') {
    message.name = getState().user.name;
    const { data: newMessage } = await axios.post('/api/directs', message);
    dispatch(gotNewDirect(newMessage));
    socket.emit('new-direct', newMessage);
  }
};

export const postChannel = (channel) => {
  return async (dispatch) => {
    const data = { channel: channel };
    const response = await axios.post('/api/channels', data);
    const newChannel = response.data;
    dispatch(getChannel(newChannel));
    socket.emit('new-channel', newChannel);
  };
};

export const postLikes = (messageId, channelId) => {
  return async (dispatch) => {
    const data = { messageId: messageId, channelId: channelId };
    const response = await axios.put(`/api/messages/${messageId}`, data);
    dispatch(addLike(messageId));
    socket.emit('new-like', messageId);
  };
};

export const postEmoji = (messageId, emoji) => {
  return async (dispatch) => {
    // const data = { messageId: messageId, channelId: channelId };
    // const response = await axios.put(`/api/messages/${messageId}`, data);
    dispatch(addEmoji(messageId, emoji));
    // socket.emit('new-like', messageId);
  };
};

export const postSaved = (userId, messageId) => {
  return async (dispatch) => {
    const data = { userId: userId, messageId: messageId };
    const response = await axios.put(`/api/authors/${userId}`, data);
    dispatch(addSaved(messageId));
  };
};

const initialState = {
  messages: [],
  newMessageEntry: '',
  user: {
    id: 1,
    name: 'Cody Hardy',
    image: '/images/avataaars (1).png',
    saved: [1],
  },
  users: [],
  channels: [],
  directs: [],
  currentPage: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case GOT_NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] };
    case GOT_DIRECT:
      return { ...state, directs: action.messages };
    case GOT_NEW_DIRECT:
      return { ...state, directs: [...state.directs, action.message] };
    case USER_SET:
      return { ...state, user: action.payload };
    case GET_USERS:
      return { ...state, users: action.users };
    case GET_CHANNEL:
      return { ...state, channels: [...state.channels, action.channel] };
    case GET_CHANNELS:
      return { ...state, channels: action.channels };
    case ADD_LIKE:
      const filteredMessages = state.messages.map((message) => {
        if (message.id === action.messageid) {
          message.likes = message.likes + 1;
        }
        return message;
      });
      return { ...state, messages: filteredMessages };

    case ADD_EMOJI:
      const handleEmojiQuanitity = (emoji, message) => {
        if (!message.emojis) {
          message.emojis = [];
        }
        let newSelectedEmojis = message.emojis;
        for (let selectedEmoji of newSelectedEmojis) {
          if (selectedEmoji.name === emoji.name) {
            selectedEmoji.quan += 1;
            return newSelectedEmojis;
          }
        }
        emoji.quan = 1;
        return [...message.emojis, emoji];
      };

      const filteredEmojiMessages = state.messages.map((message) => {
        if (message.id === action.messageid) {
          message.emojis = handleEmojiQuanitity(action.emoji, message);
        }
        return message;
      });
      return { ...state, messages: filteredEmojiMessages };
    case ADD_SAVED:
      let newSaved = state.user.saved;
      if (newSaved.indexOf(action.messageId.toString()) === -1) {
        newSaved = [...newSaved, action.messageId];
      }
      state.user.saved = newSaved;
      return { ...state, user: state.user };
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);
export default store;
