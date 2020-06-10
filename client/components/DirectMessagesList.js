import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DirectMessagesList extends Component {
  render() {
    return (
      <ul>
        {this.props.users.map((user) => {
          if (user.id !== this.props.user.id) {
            return (
              <li key={user.id}>
                <NavLink to={`/directs/${user.id}`} activeClassName="active">
                  <span>@{user.name}</span>
                </NavLink>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}
const mapStateToProps = (state) => ({
  messages: state.messages,
  channels: state.channels,
  users: state.users,
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(DirectMessagesList));
