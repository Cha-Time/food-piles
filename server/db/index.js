const db = require("./db");

const Messages = require("./models/Message");
const Organization = require("./models/Organization");
const Chat = require('./models/Chat')
const User = require("./models/User");

//associations could go here!

Messages.belongsTo(Chat)
Chat.hasMany(Messages)

User.belongsToMany(Chat, { through: 'user_chat' })
Chat.belongsToMany(User, { through: 'user_chat' })


User.belongsTo(Organization);
Organization.hasOne(User);

User.belongsToMany(Organization, { through: "favorites", as: "userId" });
Organization.belongsToMany(User, { through: "favorites", as: "orgId" });
User.belongsToMany(User, {
  through: Messages
});

module.exports = {
  db,
  models: {
    User,
    Organization,
    Messages,
  },
};
