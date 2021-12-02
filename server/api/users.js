const router = require('express').Router();
const {
  models: { User },
} = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const targetUser = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    res.json(targetUser);
  } catch (error) {
    next(error);
  }
});
