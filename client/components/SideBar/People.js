import React from 'react';
import { connect } from 'react-redux';
import PeopleCard from './PeopleCard';

function People(props) {
  const users = props.users;
  return (
    <div className="media-list">
      <div id="people">
        {users.map((user) => {
          return <PeopleCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(People);
