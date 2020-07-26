import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import PeopleIcon from '@material-ui/icons/People';

export default class ColumnTools extends Component {
  render() {
    return (
      <div>
        <h5>Menu</h5>
        <ul className="tool_list">
          <li>
            <NavLink to={`/saved`} activeClassName="active">
              <span>
                {' '}
                <BookmarkRoundedIcon />
                Saved Items
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/people`} activeClassName="active">
              <span>
                {' '}
                <PeopleIcon />
                People
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
