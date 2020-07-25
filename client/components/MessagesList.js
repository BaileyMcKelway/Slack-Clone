import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import { fetchMessages } from '../store.js';

class MessagesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchInitialMessages();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages
      .filter((message) => message.channelId === channelId)
      .sort((a, b) => Number(a.sortTime) - Number(b.sortTime));

    return (
      <div id="media-list-main">
        <ul className="media-list">
          {filteredMessages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
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
