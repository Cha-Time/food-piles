const db = require("./db");

const Message = require("./models/Message");
const Organization = require("./models/Organization");
const Chat = require("./models/Chat");
const User = require("./models/User");

//associations could go here!

Message.belongsTo(Chat);
Chat.hasMany(Message);

User.belongsToMany(Chat, { through: "user_chat" });
Chat.belongsToMany(User, { through: "user_chat" });

User.belongsTo(Organization);
Organization.hasOne(User);

User.belongsToMany(Organization, { through: "favorites" });
Organization.belongsToMany(User, { through: "favorites" });

module.exports = {
  db,
  models: {
    User,
    Organization,
    Message,
  },
};
