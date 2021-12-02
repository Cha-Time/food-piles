const router = require("express").Router();
const {
  models: { Organization, User },
} = require("../db");

module.exports = router;

//make these admin middleware
router.get("/", async (req, res, next) => {
  try {
    const organizations = await Organization.findAll({
      include: User,
    });
    res.json(organizations);
  } catch (error) {
    next(error);
  }
});

//make these admin middleware
router.get("/:orgId", async (req, res, next) => {
  try {
    const targetOrg = await Organization.findOne({
      where: {
        id: req.params.orgId,
      },
      include: User,
    });
    res.json(targetOrg);
  } catch (error) {
    next(error);
  }
});
