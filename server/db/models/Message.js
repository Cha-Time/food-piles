const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  timeStamp: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  messageText: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Message;
