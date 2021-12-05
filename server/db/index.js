const db = require("./db");

const Message = require("./models/Message");
const Organization = require("./models/Organization");
const Chat = require("./models/Chat");
const User = require("./models/User");
const Favorites = require("./models/Favorites");

//associations could go here!

Message.belongsTo(Chat);
Chat.hasMany(Message);

User.belongsToMany(Chat, { through: "user_chat" });
Chat.belongsToMany(User, { through: "user_chat" });

User.belongsTo(Organization);
Organization.hasOne(User);

User.belongsToMany(Organization, { through: Favorites });
Organization.belongsToMany(User, { through: Favorites });

module.exports = {
  db,
  models: {
    User,
    Organization,
    Message,
    Favorites,
  },
};
