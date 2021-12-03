const db = require("./db");

const Messages = require("./models/Message");
const Organization = require("./models/Organization");
const User = require("./models/User");

//associations could go here!

User.belongsTo(Organization);
Organization.hasOne(User);

User.belongsToMany(Organization, { through: "favorites" });
Organization.belongsToMany(User, { through: "favorites" });
User.belongsToMany(User, {
  through: Messages,
  as: "receiver",
  foreignKey: "senderId",
});

module.exports = {
  db,
  models: {
    User,
    Organization,
    Messages,
  },
};
