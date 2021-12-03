const db = require("./db");

const Messages = require("./models/Message");
const Organization = require("./models/Organization");
const User = require("./models/User");

//associations could go here!

User.belongsTo(Organization);
Organization.hasOne(User);

User.belongsToMany(Organization, { through: "favorites", as: "userId" });
Organization.belongsToMany(User, { through: "favorites", as: "orgId" });
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
