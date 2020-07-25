import React from 'react';
import { connect } from 'react-redux';
import { postChannel } from '../../store';
import { useForm } from 'react-hook-form';

const NewChannelEntry = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const name = data.channelName;
    props.postChannel(name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
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
  );
};

const mapDispatchToProps = (dispath) => ({
  postChannel: (name) => dispath(postChannel(name)),
});

export default connect(null, mapDispatchToProps)(NewChannelEntry);
