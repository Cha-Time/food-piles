const db = require("./db");

const Chat = require("./models/Chat");
const Favorite = require("./models/Favorite");
const Message = require("./models/Message");
const Organization = require("./models/Organization");
const User_Chat = require("./models/User_Chat");
const User = require("./models/User");

//associations could go here!
// User.hasMany(Order)
// Order.belongsTo(User)

// Order.belongsToMany(Plant, {through: OrderPlant})
// Plant.belongsToMany(Order, {through: OrderPlant })

module.exports = {
  db,
  models: {
    User,
    User_Chat,
    Organization,
    Message,
    Favorite,
    Chat,
  },
};
