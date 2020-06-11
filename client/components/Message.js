import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Container from '@material-ui/core/Container';
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
    <Container fixed>
      <li
        className={open ? 'message_hover media' : 'media'}
        onMouseEnter={handleHover}
        onMouseLeave={handleNotHover}
      >
        <div className="media-date">
          <h6>{message.date}</h6>
          <IconButton
            aria-label="save"
            onClick={() => {
              handleSave(user.id, message.id);
            }}
          >
            <BookmarkRoundedIcon />
          </IconButton>
        </div>
        <div>
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
            <h4 className="media-heading">{message.author.name}</h4>
            <p>{message.time}</p>

            {message.content}
          </div>
          <div className="media-right">
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
    </Container>
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
