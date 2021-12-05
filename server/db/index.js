const db = require("./db");

const Message = require("./models/Message");
const Organization = require("./models/Organization");
const Chat = require("./models/Chat");
const User = require("./models/User");

//associations could go here!

Message.belongsTo(Chat);
Chat.hasMany(Message);

// User.hasMany(Message);
// Message.belongsTo(User);

User.belongsToMany(Chat, { through: "user_chats" });
Chat.belongsToMany(User, { through: "user_chats" });

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
