const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
  models: { Message },
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
router.get("/:receiverId", requireToken, async (req, res, next) => {
  try {
    const myInfo = User.findOne(req.user.id, {
      include: Organization,
    });
    const messages = await Message.findAll({
      where: {
        userId: {
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
    const myInfo = User.findOne(req.user.id, {
      include: Organization,
    });
    const message = await Message.create({
      messageText: req.body.messageText,
      timeStamp: Date.now(),
      userId: myInfo.organization.id,
      receiverId: req.body.receiverId,
    });
    res.json(message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
