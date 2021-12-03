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
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      accType: req.body.accType,
    });

    let newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      accType: req.body.accType,
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
