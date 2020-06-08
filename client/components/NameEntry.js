import React, { Component } from 'react';
import store, { userSet } from '../store';

export default class NameEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return (
      <form
        className="form-inline"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={(e) => this.handleChange(e.target.value)}
        />
      </form>
    );
  }
}
