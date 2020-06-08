import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ChannelList extends Component {
  render() {
    return (
      <ul>
        {this.props.channels.map((channel) => {
          return (
            <li key={channel.id}>
              <NavLink to={`/channels/${channel.id}`} activeClassName="active">
                <span># {channel.name}</span>
                <span className="badge">
                  {
                    this.props.messages.filter(
                      (message) => message.channelId === channel.id
                    ).length
                  }
                </span>
              </NavLink>
            </li>
          );
        })}
        <li>
          <NavLink to="/new-channel">Create a channel ...</NavLink>
        </li>
      </ul>
    );
  }
}
const mapStateToProps = (state) => ({
  messages: state.messages,
  channels: state.channels,
});

export default withRouter(connect(mapStateToProps)(ChannelList));
