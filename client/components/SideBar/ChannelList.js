import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Expand from 'react-expand-animated';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div>
        <div className="channels_expand" onClick={this.handleClick}>
          {this.state.open ? (
            <KeyboardArrowDownRoundedIcon fontSize={'large'} />
          ) : (
            <KeyboardArrowRightRoundedIcon fontSize={'large'} />
          )}
          <h5>Channels</h5>
        </div>
        <ul className="channels_list">
          <Expand open={this.state.open} duration={100}>
            <div>
              {this.props.channels.map((channel) => {
                return (
                  <li key={channel.id}>
                    <NavLink
                      to={`/channels/${channel.id}`}
                      activeClassName="active"
                    >
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
            </div>
          </Expand>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  messages: state.messages,
  channels: state.channels,
});

export default withRouter(connect(mapStateToProps)(ChannelList));
