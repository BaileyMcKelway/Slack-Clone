import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Container from '@material-ui/core/Container';
import { postLikes, postSaved } from '../store';
import { connect } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

function Message(props) {
  const message = props.message;

  const customReactionEmojis = [
    {
      name: '+1',
      short_names: ['+1'],
      text: '',
      emoticons: [],
      keywords: ['thumbsup'],
      quan: 1,
    },
    {
      name: 'clap',
      short_names: ['clap'],
      text: '',
      emoticons: [],
      keywords: ['clap'],
    },
    {
      name: 'mega',
      short_names: ['mega'],
      text: '',
      emoticons: [],
      keywords: ['mega', 'cheering megaphone'],
    },
    {
      name: 'zap',
      short_names: ['zap'],
      text: '',
      emoticons: [],
      keywords: ['zap', 'high voltage sign'],
    },
    {
      name: 'rocket',
      short_names: ['rocket'],
      text: '',
      emoticons: [],
      keywords: ['rocket'],
    },
    {
      name: 'fire',
      short_names: ['fire'],
      text: '',
      emoticons: [],
      keywords: ['fire'],
    },
    {
      name: 'hammer_and_wrench',
      short_names: ['hammer_and_wrench'],
      text: '',
      emoticons: [],
      keywords: ['hammer_and_wrench'],
    },
  ];

  const user = props.user;
  const [anchorEl, setAnchorEl] = useState(null);
  const [likes, setLikes] = useState(message.likes);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [reactionShown, setReactionShown] = useState(false);

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

  const handleEmojiSelect = (emoji) => {
    setSelectedEmojis([...selectedEmojis, emoji]);
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
                // handleLike(message.id, message.channelId);
                setReactionShown(!reactionShown);
              }}
            >
              {reactionShown && (
                <div className="reactions">
                  <Picker
                    showPreview={false}
                    showSkinTones={false}
                    include={['custom']}
                    custom={customReactionEmojis}
                    onSelect={handleEmojiSelect}
                  />
                </div>
              )}
              <EmojiEmotionsIcon />
              {likes}
            </IconButton>
            {selectedEmojis.map((emoji, index = 0) => {
              return <Emoji key={index} emoji={emoji} size={16} />;
            })}
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
