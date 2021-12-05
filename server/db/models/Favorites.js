const Sequelize = require("sequelize");
const db = require("../db");

const Favorites = db.define("favorites", {
  distance: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Favorites;
