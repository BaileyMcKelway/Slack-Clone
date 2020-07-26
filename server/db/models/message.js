const Sequelize = require('sequelize');
const db = require('../db');
const Author = require('./author');
const moment = require('moment');

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
        // const date = new Date();

        // const current_hour = date.getHours();
        // const current_minute = date.getMinutes();
        // let current_seconds = date.getSeconds();
        // if (current_seconds < 10) {
        //   console.log('jo');
        //   current_seconds = '0' + current_seconds.toString();
        //   current_seconds = Number(current_seconds);
        // }
        // const year = date.getFullYear();
        // const month = date.getMonth();
        // const day = date.getDay();
        message.sortTime = moment().format('YYYYMMDDhhmmss');
        message.time = moment().format('hh:mm:ss a');
        message.date = moment().format('MMMM Do YYYY');
      },
    },
  }
);

module.exports = Messages;
