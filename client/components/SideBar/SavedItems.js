import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';

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
    console.log(this.props.user);
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
      <div>
        <ul className="media-list">
          {this.state.messages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
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
