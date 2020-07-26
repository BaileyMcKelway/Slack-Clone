import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import NoMessages from '../NoMessages';

class SaveItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
  }
  componentDidMount() {
    const savedMessages = this.props.user.saved;
    const messages = this.state.messages;
    let newMessages = [];

    messages.map((message) => {
      if (savedMessages.indexOf(message.id) !== -1) {
        newMessages.push(message);
      }
    });
    this.setState({
      messages: newMessages,
    });
  }

  render() {
    return (
      <div id="saved-main">
        <ul className="media-list">
          {this.state.messages.length > 0 ? (
            this.state.messages.map((message) => (
              <Message message={message} key={message.id} />
            ))
          ) : (
            <NoMessages />
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
  };
};

export default connect(mapStateToProps, null)(SaveItems);
