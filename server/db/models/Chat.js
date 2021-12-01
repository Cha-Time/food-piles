const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Chat;
