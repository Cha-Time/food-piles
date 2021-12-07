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
        availabilityStatus: true,
      },
    });
    res.json(donors);
  } catch (error) {
    next(error);
  }
});
