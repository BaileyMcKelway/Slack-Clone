import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import Expand from 'react-expand-animated';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

class DirectMessagesList extends Component {
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
          <h5>Direct Messages</h5>
        </div>
        <ul className="direct_messages_list">
          <Expand open={this.state.open} duration={100}>
            {this.props.users.map((user) => {
              const online = Math.floor(Math.random() * 2);
              if (user.id !== this.props.user.id) {
                return (
                  <li key={user.id}>
                    <NavLink
                      to={`/directs/${user.id}`}
                      activeClassName="active"
                    >
                      <span>
                        {online ? (
                          <FiberManualRecordSharpIcon
                            style={{ color: '#06be78', height: '50%' }}
                          />
                        ) : (
                          <FiberManualRecordSharpIcon
                            style={{ height: '50%' }}
                          />
                        )}{' '}
                        @{user.name}
                      </span>
                    </NavLink>
                  </li>
                );
              }
            })}
          </Expand>
        </ul>
      </div>
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
