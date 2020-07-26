import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './Sidebar/SideBar';
import Navbar from './Navbar';
import MessagesList from './Message/MessagesList';
import NewChannelEntry from './SideBar/NewChannelEntry';
import DirectMessages from './DirectMessages/DirectMessages';
import SavedItems from './SideBar/SavedItems';
import People from './SideBar/People';
import {
  fetchMessages,
  fetchChannels,
  fetchUsers,
  fetchDirects,
} from '../store';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchInitialMessages();
    this.props.fetchInitialChannels();
    this.props.fetchInitialUsers();
    this.props.fetchInitialDirects();
  }

  render() {
    return (
      <div id="test">
        <SideBar user={this.props.user} users={this.props.users} />
        <Navbar />
        <main id="main" className="main">
          <Switch>
            <Route path="/new-channel" component={NewChannelEntry} />
            <Route path="/channels/:channelId" component={MessagesList} />
            <Route path="/saved" component={SavedItems} />
            <Route path="/directs/:directId" component={DirectMessages} />
            <Route path="/people" component={People} />
            <Redirect to="/channels/1" />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    user: state.user,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialMessages: () => dispatch(fetchMessages()),
    fetchInitialChannels: () => dispatch(fetchChannels()),
    fetchInitialUsers: () => dispatch(fetchUsers()),
    fetchInitialDirects: () => dispatch(fetchDirects()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
