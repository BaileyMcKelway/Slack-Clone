import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';

function NoMessages(props) {
  const message = props.message;

  return (
    <Container fixed>
      <div className="no-messages-main">
        <img src="https://i.imgur.com/0fAd5JV.png" />
      </div>
    </Container>
  );
}

export default withRouter(NoMessages);
