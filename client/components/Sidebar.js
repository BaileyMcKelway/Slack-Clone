import React from 'react';
import ChannelList from './ChannelList';
import ColumnTools from './ColumnTools';
import DirectMessagesList from './DirectMessagesList';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import GroupIcon from '@material-ui/icons/Group';

export default function Sidebar(props) {
  return (
    <section className="sidebar">
      <div id="sidebar-scroll">
        <div className="sidebar-header">
          <h3 href="#">
            <div>Slackin</div>
            <i alt="Brand" className="glyphicon glyphicon-comment" />
          </h3>
          <span className="sidebar-currentuser">
            <FiberManualRecordSharpIcon
              style={{ color: '#06be78', height: '50%' }}
            />
            <h5>{props.user.name}</h5>
            <div className="sidebar-totalusers">
              <GroupIcon />
              {props.users.length}
            </div>
          </span>
        </div>

        <ColumnTools />
        <ChannelList />
        <DirectMessagesList />
      </div>
    </section>
  );
}
