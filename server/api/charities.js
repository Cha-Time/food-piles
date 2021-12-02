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
      include: User,
    });
    res.json(charities);
  } catch (error) {
    next(error);
  }
});

router.get("/:orgId", async (req, res, next) => {
  try {
    const targetCharity = await Organization.findOne({
      where: {
        accType: "charity",
        id: req.params.orgId,
      },
      include: User,
    });
    res.json(targetCharity);
  } catch (error) {
    next(error);
  }
});
