import React from 'react';
import { withRouter } from 'react-router-dom';

function MessageBody(props) {
  const message = props.message;

  return (
    <div className="media-body">
      <h4 className="media-heading">{message.author.name}</h4>
      <p>{message.time}</p>

      {message.content}
    </div>
  );
}

export default withRouter(MessageBody);
