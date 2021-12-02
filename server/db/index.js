const db = require('./db');

// const Chat = require('./models/Chat');
const Messages = require('./models/Message');
const Organization = require('./models/Organization');
const User = require('./models/User');

//associations could go here!

User.hasOne(Organization);
Organization.belongsTo(User);

// User.belongsToMany(User, { through: 'favorites', as: 'follows' });
User.belongsToMany(User, { through: Messages, as: 'receiver', foreignKey: 'senderId' });

module.exports = {
  db,
  models: {
    User,
    Organization,
    Messages,
  },
};
