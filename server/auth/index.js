const router = require("express").Router();
const {
  models: { User, Organization },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
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

    res.send({ token: await newUser.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
