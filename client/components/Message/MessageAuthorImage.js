import React from 'react';
import { withRouter } from 'react-router-dom';

function MessageAuthorImage(props) {
  const message = props.message;

  return (
    <div className="media-left">
      <a href="#">
        <img className="media-object" src={message.author.image} alt="image" />
      </a>
    </div>
  );
}

export default withRouter(MessageAuthorImage);
