import React from 'react';
import { withRouter } from 'react-router-dom';
// import logo from './Slack_Mark_Web.png';
function Loading(props) {
  const logo = require('./Slack_Mark_Web.png');
  return (
    <div id="loading-content" className="loading">
      <img src={'https://i.imgur.com/LOh3LH8.png'} />
    </div>
  );
}

export default withRouter(Loading);
