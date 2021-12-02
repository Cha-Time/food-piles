const router = require("express").Router();
const {
  models: { Organization, User },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const donors = await Organization.findAll({
      where: {
        accType: "donor",
      },
      include: User,
    });
    res.json(donors);
  } catch (error) {
    next(error);
  }
});

router.get("/:orgId", async (req, res, next) => {
  try {
    const targetDonor = await Organization.findOne({
      where: {
        accType: "charity",
        id: req.params.orgId,
      },
      include: User,
    });
    res.json(targetDonor);
  } catch (error) {
    next(error);
  }
});
