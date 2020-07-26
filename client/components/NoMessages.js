import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

function NoMessages(props) {
  const message = props.message;

  return (
    <div className="no-messages-main">
      <img src="https://i.imgur.com/0fAd5JV.png" />
    </div>
  );
}

export default withRouter(NoMessages);
