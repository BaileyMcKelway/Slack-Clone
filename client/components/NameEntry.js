import React, { Component } from 'react';
import store, { createUser, userSet } from '../Store/store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class NameEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { store: store.getState() };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(newName) {
    const action = userSet(newName);
    store.dispatch(action);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    this.props.createUser(name);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={() => this.handleSubmit(event)}>
        <label htmlFor="name">
          Your name:
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="form-control"
          />
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (name) => dispatch(createUser(name)),
});

export default withRouter(connect(null, mapDispatchToProps)(NameEntry));
