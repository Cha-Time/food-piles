const router = require("express").Router();
const {
  models: { User },
} = require("../db");

module.exports = router;

const { requireToken } = require("./authMiddleware");

// GET for all organizatoins that this user follows// check to see if the current logged in user follows the ID specified here (user ID, connected to an organizatoin)
router.get("/", requireToken, async (req, res, next) => {
  try {
    const myUser = await User.findByPk(Number(req.user.id));

    const myFavorites = await myUser.getOrganizations();
    res.json(myFavorites);
  } catch (error) {
    next();
  }
});

// if there is nothing found, we return nothing, which is interpreted on the other side as no

// router.get("/:orgId", requireToken, async (req, res, next) => {
//   try {
//     const myUserId = req.user.id;
//     const followOrgId = req.body.orgId;
//     const isFavorite = await favorites.findAll({
//       where: {
//         userId: myUserId,
//         followId: followOrgId,
//       },
//     });
//     res.json(isFavorite);
//   } catch (error) {
//     next();
//   }
// });

// POST - logged in user follows the ID specified
router.post("/", requireToken, async (req, res, next) => {
  try {
    const favoriteOrgId = req.body.orgId;

    const myUser = await User.findByPk(Number(req.user.id));

    const makeFavorite = await myUser.addOrganization(favoriteOrgId);
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
