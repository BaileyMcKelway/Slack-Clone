import React, { Component } from 'react';
import Message from './Message';
import NewDirectEntry from './NewDirectEntry';
import { connect } from 'react-redux';
import { fetchDirects } from '../store.js';

class DirectMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directs: [],
    };
  }

  componentDidMount() {
    this.props.fetchInitialDirects();
  }

  render() {
    const receiver = Number(this.props.match.params.directId);
    const sender = this.props.user.id;
    const messages = this.props.directs;
    let filteredMessages = [];
    messages.map((message) => {
      if (message.sender === sender || message.sender === receiver) {
        if (message.receiver === receiver || message.receiver === sender) {
          filteredMessages.push(message);
        }
      }
    });

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </ul>

        <NewDirectEntry />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.user,
    directs: state.directs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialDirects: () => dispatch(fetchDirects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessages);