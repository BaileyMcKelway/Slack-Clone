import io from 'socket.io-client';
import store, { gotNewMessageFromServer, getChannel } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {});
socket.on('new-message', (message) => {
  store.dispatch(gotNewMessageFromServer(message));
});

socket.on('new-channel', (channel) => {
  store.dispatch(getChannel(channel));
});

export default socket;
