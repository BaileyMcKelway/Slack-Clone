import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import NoMessages from '../NoMessages';
import { connect } from 'react-redux';
import { fetchMessages } from '../../store.js';
import { animateScroll } from 'react-scroll';

class MessagesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchInitialMessages();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'main',
    });
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages
      .filter((message) => message.channelId === channelId)
      .sort((a, b) => a.sortTime - b.sortTime);

    return (
      <div id="media-list-main">
        <ul className="media-list">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <Message message={message} key={message.id} />
            ))
          ) : (
            <NoMessages />
          )}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialMessages: () => dispatch(fetchMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
