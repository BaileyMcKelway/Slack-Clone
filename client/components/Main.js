import React, { Component } from 'react';
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
} from '../store';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchInitialMessages();
    await this.props.fetchInitialChannels();
    await this.props.fetchInitialUsers();
    await this.props.fetchInitialDirects();
    this.handleLoad();
  }
  handleLoad() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      document.body.style.background = 'white';
      // document.getElementByTagName('body').style.display = 'flex';
      // document.getElementByTagName('body').style.flex = '1, 1, auto';
    }, 2000);
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div>
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
    // return (
    //   <div>
    //     {this.state.loading ? (
    //       <Loading />
    //     ) : (
    //       <div>
    //         <SideBar user={this.props.user} users={this.props.users} />
    //         <Navbar />
    //         <main id="main" className="main">
    //           <Switch>
    //             <Route path="/new-channel" component={NewChannelEntry} />
    //             <Route path="/channels/:channelId" component={MessagesList} />
    //             <Route path="/saved" component={SavedItems} />
    //             <Route path="/directs/:directId" component={DirectMessages} />
    //             <Route path="/people" component={People} />
    //             <Redirect to="/channels/1" />
    //           </Switch>
    //         </main>
    //       </div>
    //     )}
    //   </div>
    // );
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
