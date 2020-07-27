import React from 'react';
import { withRouter } from 'react-router-dom';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import IconButton from '@material-ui/core/IconButton';
import { postSaved } from '../../Store/store';
import { connect } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css';

function MessageSave(props) {
  const message = props.message;

  const moment = require('moment');
  const CurrentDate = moment().format('YYYYMMDDhhmmss');
  // const date = new Date();
  // const CurrentDate = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

  const user = props.user;

  const handleSave = (userId, messageId) => {
    props.save(userId, messageId);
  };

  return (
    <div className="media-date">
      <h6>{message.date}</h6>

      {CurrentDate - message.sortTime < 60 ? <p id="new_tag">New</p> : ''}

      <IconButton
        aria-label="save"
        onClick={() => {
          handleSave(user.id, message.id);
        }}
      >
        <BookmarkRoundedIcon />
      </IconButton>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  save: (userId, messageId) => dispatch(postSaved(userId, messageId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MessageSave)
);
