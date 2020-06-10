import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import NewChannelEntry from './NewChannelEntry';
import DirectMessages from './DirectMessages';
import SavedItems from './SavedItems';
import store, {
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
      <div>
        <Sidebar />
        <Navbar />
        <main>
          <Switch>
            <Route path="/new-channel" component={NewChannelEntry} />
            <Route path="/channels/:channelId" component={MessagesList} />
            <Route path="/directs/:directId" component={DirectMessages} />
            <Route path="/saved" component={SavedItems} />
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
