import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

export default class PeopleCard extends Component {
  constructor(props) {
    super(props);
  }
  // const user = props.user;
  render() {
    const user = this.props.user;
    return (
      <div id="people_card">
        <Link to={`/directs/${user.id}`}>
          <Paper elevation={3}>
            <div id="people_card_content">
              <img src={user.image} />
              <h5>{user.name}</h5>
            </div>
          </Paper>
        </Link>
      </div>
    );
  }
}
