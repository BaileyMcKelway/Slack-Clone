import React from 'react';
import ChannelList from './ChannelList';
import ColumnTools from './ColumnTools';
import DirectMessagesList from '../DirectMessages/DirectMessagesList';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import GroupIcon from '@material-ui/icons/Group';

export default function SideBar(props) {
  return (
    <section className="sidebar">
      <div id="sidebar-scroll">
        <div className="sidebar-header">
          <h3 href="#">
            <div>Slackin</div>
            <img
              alt="Brand"
              src={'https://i.imgur.com/lMVHADL.png'}
              style={{ width: '25%' }}
            />
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
