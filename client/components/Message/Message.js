import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css';
import MessageBody from './MessageBody';
import MessageEmoji from './MessageEmoji';
import MessageAuthorImage from './MessageAuthorImage';
import MessageSave from './MessageSave';

function Message(props) {
  const message = props.message;
  const user = props.user;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotHover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Container fixed>
      <li
        className={open ? 'message_hover media' : 'media'}
        onMouseEnter={handleHover}
        onMouseLeave={handleNotHover}
      >
        <MessageSave message={message} user={user} />
        <MessageAuthorImage message={message} />
        <MessageBody message={message} />
        <MessageEmoji message={message} />
      </li>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(Message));
