const db = require('./db');

const Messages = require('./models/Message');
const Organization = require('./models/Organization');
const Chat = require('./models/Chat');
const User = require('./models/User');

//associations could go here!

Messages.belongsTo(Chat);
Chat.hasMany(Messages);

User.belongsToMany(Chat, { through: 'user_chat' });
Chat.belongsToMany(User, { through: 'user_chat' });


User.belongsTo(Organization);
Organization.hasOne(User);

User.belongsToMany(Organization, { through: 'favorites' });
Organization.belongsToMany(User, { through: 'favorites' });

module.exports = {
  db,
  models: {
    User,
    Organization,
    Message,
  },
};
