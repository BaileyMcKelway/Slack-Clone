import React, { Component } from 'react';
import { sendMessage, writeMessage } from '../../Store/store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

export class NewDirectEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.props.write(evt.target.value);
    this.setState({
      input: this.props.newMessageEntry,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const message = event.target.content.value;
    this.props.submitMessage({
      authorId: this.props.user.id,
      content: message,
      directId: Number(this.props.match.params.directId),
      userId: this.props.user.id,
      type: 'direct',
    });
    this.setState({
      input: '',
    });
  }

  render() {
    return (
      <Container fixed>
        <form id="new-message-form" onSubmit={this.handleSubmit}>
          <div className="input-group input-group-lg">
            <input
              className="form-control"
              type="text"
              name="content"
              value={this.state.input}
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.newMessageEntry,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  write: (message) => dispatch(writeMessage(message)),
  submitMessage: (message) => dispatch(sendMessage(message)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewDirectEntry)
);
