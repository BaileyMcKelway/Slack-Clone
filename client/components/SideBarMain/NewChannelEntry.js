import React from 'react';
import { connect } from 'react-redux';
import { postChannel } from '../../Store/store';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';

const NewChannelEntry = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const name = data.channelName;
    props.postChannel(name);
  };

  return (
    <Container fixed>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="media-list-main" className="form-group">
          <label htmlFor="name">Create a Channel</label>
          <input
            className="form-control"
            type="text"
            name="channelName"
            placeholder="Enter channel name"
            ref={register}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default">
            Create Channel
          </button>
        </div>
      </form>
    </Container>
  );
};

const mapDispatchToProps = (dispath) => ({
  postChannel: (name) => dispath(postChannel(name)),
});

export default connect(null, mapDispatchToProps)(NewChannelEntry);
