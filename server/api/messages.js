const router = require('express').Router();
const {
  models: { Messages },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const messages = await Messages.findAll();
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const message = await Messages.create({
      messageText: req.body,
      timeStamp: Date.now(),
      senderId: 1,
      receiverId: 2,
    });
    res.json(message);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
