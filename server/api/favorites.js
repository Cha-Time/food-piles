const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./authMiddleware");

module.exports = router;

// GET for all organizattions that the logged in user follows
router.get("/", requireToken, async (req, res, next) => {
  try {
    const myUser = await User.findByPk(Number(req.user.id));

    const myFavorites = await myUser.getOrganizations({ attributes: ["id"] });
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
    console.log(req.body);

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
    console.log(req.body);
    const myUser = await User.findByPk(Number(req.user.id));
    const makeFavorite = await myUser.removeOrganization(favoriteOrgId);
    res.json(makeFavorite);
  } catch (error) {
    next();
  }
});
