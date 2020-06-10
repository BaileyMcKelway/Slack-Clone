import React, { Component } from 'react';
import SavedItems from './SavedItems';
import { NavLink } from 'react-router-dom';

export default class ColumnTools extends Component {
  render() {
    return (
      <div>
        <h5>Menu</h5>
        <ul className="tool_list">
          <li>
            <NavLink to={`/saved`} activeClassName="active">
              <span> Saved Items</span>
              {/* <SavedItems /> */}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/drafts`} activeClassName="active">
              <span> Drafts</span>
              {/* <SavedItems /> */}
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
