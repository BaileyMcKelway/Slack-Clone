import React, { Component } from 'react';
import NameEntry from './NameEntry';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav>
        <h5># Channel</h5>

        <NameEntry />
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  channels: state.channels,
  users: state.users,
});

export default withRouter(connect(mapStateToProps)(NavBar));
