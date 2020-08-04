import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './SideBarMain/SideBar';
import Navbar from './Navbar';
import MessagesList from './Message/MessagesList';
import NewChannelEntry from './SideBarMain/NewChannelEntry';
import DirectMessages from './DirectMessages/DirectMessages';
import SavedItems from './SideBarMain/SavedItems';
import People from './SideBarMain/People';
import Loading from './Loading';
import {
  fetchMessages,
  fetchChannels,
  fetchUsers,
  fetchDirects,
} from '../Store/store';

import { User } from '../Models/Users';
import { Channel } from '../Models/Channels';

type MainProps = {
  fetchInitialMessages: () => void;
  fetchInitialChannels: () => void;
  fetchInitialUsers: () => void;
  fetchInitialDirects: () => void;
  user: User;
  users: User[];
  channels: Channel;
};

function Main(props: MainProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      function handleLoad() {
        setTimeout(() => {
          setLoading(false);
          document.body.style.background = 'white';
        }, 2000);
      }
      await props.fetchInitialMessages();
      await props.fetchInitialChannels();
      await props.fetchInitialUsers();
      await props.fetchInitialDirects();
      handleLoad();
    })();
  }, []);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <SideBar user={props.user} users={props.users} />
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

const mapStateToProps = (state: any) => {
  return {
    channels: state.channels,
    user: state.user,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchInitialMessages: () => dispatch(fetchMessages()),
    fetchInitialChannels: () => dispatch(fetchChannels()),
    fetchInitialUsers: () => dispatch(fetchUsers()),
    fetchInitialDirects: () => dispatch(fetchDirects()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
