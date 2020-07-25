const Sequelize = require('sequelize');
const db = require('../db');
const Author = require('./author');

const Messages = db.define(
  'message',
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sortTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '0',
    },
  },
  {
    defaultScope: {
      include: [{ model: Author }],
    },
    hooks: {
      beforeValidate: function (message) {
        const date = new Date();
        const current_hour = date.getHours();
        const current_minute = date.getMinutes();
        const current_seconds = date.getSeconds();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        message.sortTime = `${year}${month}${day}${current_hour}${current_minute}${current_seconds}`;
        message.time = `${current_hour}:${current_minute}:${current_seconds}`;
        message.date = `${year}-${month}-${day}`;
      },
    },
  }
);

module.exports = Messages;
