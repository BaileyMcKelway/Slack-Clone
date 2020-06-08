import React, { Component } from 'react';
import { sendMessage, writeMessage } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export class NewMessageEntry extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.props.write(evt.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const message = event.target.content.value;
    this.props.submitMessage({
      content: message,
      channelId: this.props.channelId,
    });
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.newMessageEntry,
  };
};

const mapDispatchToProps = (dispath) => ({
  write: (message) => dispatch(writeMessage(message)),
  submitMessage: (message) => dispath(sendMessage(message)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
);
