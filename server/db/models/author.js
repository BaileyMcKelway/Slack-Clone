const Sequelize = require('sequelize');
const db = require('../db');

const images = ['/images/avataaars (13).png'];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

module.exports = db.define('author', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return getRandomImage();
    },
  },
  saved: {
    type: Sequelize.ARRAY(Sequelize.DECIMAL),
    defaultValue: [],
  },
});
