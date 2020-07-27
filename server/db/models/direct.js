const Sequelize = require('sequelize');
const db = require('../db');
const Author = require('./author');
const moment = require('moment');

const Direct = db.define(
  'direct',
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
        message.sortTime = moment().format('YYYYMMDDhhmmss');
        message.time = moment().format('hh:mm:ss a');
        message.date = moment().format('MMMM Do YYYY');
      },
    },
  }
);

module.exports = Direct;
