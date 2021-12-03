const router = require("express").Router();
const {
  models: { Organization, User },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const charities = await Organization.findAll({
      where: {
        accType: "charity",
      },
    });
    res.json(charities);
  } catch (error) {
    next(error);
  }
});
