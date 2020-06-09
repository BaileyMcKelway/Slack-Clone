import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { postLikes, postSaved } from '../store';
import { connect } from 'react-redux';

function Message(props) {
  const message = props.message;
  const user = props.user;
  const [anchorEl, setAnchorEl] = useState(null);
  const [likes, setLikes] = useState(message.likes);

  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotHover = () => {
    setAnchorEl(null);
  };

  const handleSave = (userId, messageId) => {
    props.save(userId, messageId);
  };

  const handleLike = (messageId, channelId) => {
    props.like(messageId, channelId);
    setLikes(likes + 1);
  };

  const open = Boolean(anchorEl);

  return (
    <li className="media">
      <div
        className={open ? 'message_hover' : ''}
        onMouseEnter={handleHover}
        onMouseLeave={handleNotHover}
      >
        <div className="media-left">
          <a href="#">
            <img
              className="media-object"
              src={message.author.image}
              alt="image"
            />
          </a>
        </div>
        <div className="media-body">
          <h6>{message.date}</h6>
          <h4 className="media-heading">{message.author.name}</h4>
          <p>{message.time}</p>
          {message.content}
        </div>
        <div className="media-right">
          <IconButton
            aria-label="save"
            onClick={() => {
              handleSave(user.id, message.id);
            }}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            aria-label="reaction"
            onClick={() => {
              handleLike(message.id, message.channelId);
            }}
          >
            <EmojiEmotionsIcon />
            {likes}
          </IconButton>
        </div>
      </div>
    </li>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  like: (messageId, channelId) => dispatch(postLikes(messageId, channelId)),
  save: (userId, messageId) => dispatch(postSaved(userId, messageId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Message)
);
