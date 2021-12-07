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

// Get all users -- ADMIN ONLY

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      include: Organization,
    });
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

// Get information about a specific user -- you must be an admin or the currently logged in user

router.get(
  "/:userId",
  requireToken,
  isAdminOrCurrentUser,
  async (req, res, next) => {
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
  }
);

// Update informatino about the currently logged in user
router.put("/", requireToken, async (req, res, next) => {
  try {
    const updateFields = req.body.updateFields;
    const targetUser = req.user.id;

    const updatedUser = await User.update(updateFields, {
      where: { id: Number(targetUser) },
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});
