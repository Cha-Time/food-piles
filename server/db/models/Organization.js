const Sequelize = require("sequelize");
const db = require("../db");

const Organization = db.define("organization", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  availabilityStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  accType: {
    type: Sequelize.ENUM(["donor", "charity"]),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  latitude: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  longitude: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  availableFood: {
    type: Sequelize.TEXT,
  },
  availableTime: {
    type: Sequelize.TEXT,
  },
  allergens: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://d1rzxhvrtciqq1.cloudfront.net/images/people/images/dY5xNEt4Wr54ahbagq7ICb/medium/b808a3-schoberlawrenceheadshot.jpg",
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true,
    },
  },
});

module.exports = Organization;

//make an after creation hook to generate lat and long on model
