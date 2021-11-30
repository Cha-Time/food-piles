const router = require("express").Router();
const {
  models: { Organization, User },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  const organizations = await Organization.findAll({
    include: User,
  });
  res.json(organizations);
});
