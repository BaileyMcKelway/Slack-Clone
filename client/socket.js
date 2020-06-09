import io from 'socket.io-client';
import store, { gotNewMessageFromServer, getChannel, addLike } from './store';

const socket = io(window.location.origin);

socket.on('new-message', (message) => {
  store.dispatch(gotNewMessageFromServer(message));
});

socket.on('new-channel', (channel) => {
  store.dispatch(getChannel(channel));
});

socket.on('new-like', (message) => {
  store.dispatch(addLike(message));
});

export default socket;
