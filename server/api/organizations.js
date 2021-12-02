const router = require("express").Router();
const {
  models: { Organization, User },
} = require("../db");

module.exports = router;

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

router.post("/", async (req, res, next) => {
  try {
    const newOrg = await Organization.create({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      phoneNumber: req.body.phoneNumber,
      accType: req.body.accType,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });

    let newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    newUser.setOrganization(newOrg);

    res.json(newOrg);
  } catch (error) {
    next(error);
  }
});
