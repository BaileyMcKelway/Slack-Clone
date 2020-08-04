import React from 'react';
import { withRouter } from 'react-router-dom';

function Loading() {
  const logo = require('./Slack_Mark_Web.png');
  return (
    <div id="loading-content" className="loading">
      <img src={'https://i.imgur.com/LOh3LH8.png'} />
    </div>
  );
}

export default withRouter(Loading);
