const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./authMiddleware");
const geolib = require("geolib");
const Organization = require("../db/models/Organization");

module.exports = router;

// GET for all organizattions that the logged in user follows
router.get("/", requireToken, async (req, res, next) => {
  try {
    const myUser = await User.findByPk(Number(req.user.id));

    const myFavorites = await myUser.getOrganizations();
    res.json(myFavorites);
  } catch (error) {
    next();
  }
});

// POST - logged in user follows the ID specified
router.post("/", requireToken, async (req, res, next) => {
  try {
    const favoriteOrgId = req.body.orgId;
    const favoriteOrg = await Organization.findByPk(favoriteOrgId);

    const myUser = await User.findOne({
      where: {
        id: Number(req.user.id),
      },
      include: Organization,
    });

    const geoDistance = (
      geolib.getDistance(
        { latitude: favoriteOrg.latitude, longitude: favoriteOrg.longitude },
        {
          latitude: myUser.organization.latitude,
          longitude: myUser.organization.longitude,
        }
      ) / 1609.34
    ).toFixed(1);

    const makeFavorite = await myUser.addOrganization(favoriteOrgId, {
      through: { distance: geoDistance },
    });

    res.json(makeFavorite);
  } catch (error) {
    next();
  }
});

// DELETE - logged in user unfollows the ID specified
router.delete("/", requireToken, async (req, res, next) => {
  try {
    const favoriteOrgId = req.body.orgId;
    const myUser = await User.findByPk(Number(req.user.id));
    const makeFavorite = await myUser.removeOrganization(favoriteOrgId);
    res.json(makeFavorite);
  } catch (error) {
    next();
  }
});
