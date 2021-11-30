const db = require("./db");

const Chat = require("./models/Chat");
const Message = require("./models/Message");
const Organization = require("./models/Organization");
const User = require("./models/User");

//associations could go here!

User.hasMany(Message);
Message.belongsTo(User);

User.hasOne(Organization);
Organization.belongsTo(User);

User.belongsToMany(Chat, { through: "userchat" });
Chat.belongsToMany(User, { through: "userchat" });

User.belongsToMany(User, { through: "favorites", as: "follows" });

module.exports = {
  db,
  models: {
    User,
    Organization,
    Message,
    Chat,
  },
};
