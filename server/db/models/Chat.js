const Sequelize = require('sequelize');
const db = require('../db');

const Chat = db.define('chat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  }
});

module.exports = Chat;
