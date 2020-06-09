import React from 'react';
import ChannelList from './ChannelList';
import ColumnTools from './ColumnTools';

export default function Sidebar() {
  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h3 href="#">
          <div>Stack Chat</div>
          <i alt="Brand" className="glyphicon glyphicon-comment" />
        </h3>
      </div>

      <ColumnTools />
      <h5>Channels</h5>
      <ChannelList />
    </section>
  );
}
