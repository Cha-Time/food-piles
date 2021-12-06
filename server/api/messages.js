const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
  models: { User, Message },
} = require("../db");
const Organization = require("../db/models/Organization");
const {
  requireToken,
  isCurrentUser,
  isAdminOrCurrentUser,
} = require("./authMiddleware");

//all messages
router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

//all messages bewtween two people
router.get("/chat/:receiverId", requireToken, async (req, res, next) => {
  try {
    const myInfo = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: Organization,
    });
    const messages = await Message.findAll({
      where: {
        senderId: {
          [Op.or]: [myInfo.organization.id, req.params.receiverId],
        },
        receiverId: {
          [Op.or]: [myInfo.organization.id, req.params.receiverId],
        },
      },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const myInfo = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: Organization,
    });
    const message = await Message.create({
      messageText: req.body.messageText,
      timeStamp: Date.now(),
      senderId: myInfo.organization.id,
      receiverId: req.body.receiverId,
    });
    res.json(message);
  } catch (err) {
    next(err);
  }
});

router.get("/all-chats", requireToken, async (req, res, next) => {
  try {
    const myInfo = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: Organization,
    });

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: myInfo.organization.id },
          { receiverId: myInfo.organization.id },
        ],
      },
    });
    let chats = {};
    messages.forEach(async (message) => {
      const receiver = message.receiverId;
      const sender = message.senderId;
      if (sender == myInfo.organization.id) {
        let receiverObj = await Organization.findOne(receiver);
        chats[receiver] = [message.messageText, receiverObj.name];
      }
      if (receiver == myInfo.organization.id) {
        let senderObj = await Organization.findOne(sender);
        chats[sender] = [message.messageText, senderObj.name];
      }
    });
    res.json(chats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
