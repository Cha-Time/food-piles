const router = require("express").Router();
const {
  models: { User, Organization },
} = require("../db");
const {
  isCurrentUser,
  requireToken,
  isAdminOrCurrentUser,
  isAdmin,
} = require("./authMiddleware");

module.exports = router;

/* put back middleware in: requireToken, isAdmin, */
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      include: Organization,
    });
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const targetUser = await User.findOne({
      where: {
        id: req.params.userId,
      },
      include: Organization,
    });
    res.json(targetUser);
  } catch (error) {
    next(error);
  }
});
