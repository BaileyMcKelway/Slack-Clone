import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

function NoMessages(props) {
  const message = props.message;

  return (
    <div className="no-messages-main">
      <Paper elevation={3}>
        <div id="no-messages-content">
          <h1>No Messages Yet</h1>
        </div>
      </Paper>
    </div>
  );
}

export default withRouter(NoMessages);
