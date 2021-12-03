const Sequelize = require('sequelize');
const db = require('../db');

const Messages = db.define('message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  timeStamp: {
    type: Sequelize.DATE,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  messageText: {
    type: Sequelize.TEXT,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = Messages;
