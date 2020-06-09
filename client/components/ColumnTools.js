import React, { Component } from 'react';
import SavedItems from './SavedItems';
import { NavLink } from 'react-router-dom';

export default class ColumnTools extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to={`/saved`} activeClassName="active">
            <span> Saved Items</span>
            {/* <SavedItems /> */}
          </NavLink>
        </li>
      </ul>
      // Saved items
      // Drafts
    );
  }
}
