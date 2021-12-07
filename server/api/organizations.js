const router = require("express").Router();
const {
  models: { Organization, User },
} = require("../db");
const { requireToken } = require("./authMiddleware");

module.exports = router;

//make these admin middleware
router.get("/", async (req, res, next) => {
  try {
    const organizations = await Organization.findAll();
    res.json(organizations);
  } catch (error) {
    next(error);
  }
});

// Set current logged in suer's organizatoni's availability
router.put("/availability", requireToken, async (req, res, next) => {
  try {
    const targetOrgId = req.user.organizationId;
    const targetOrg = await Organization.update(
      { availabilityStatus: req.body.newAvailability },
      {
        where: {
          id: targetOrgId,
        },
      }
    );
    res.json(req.body.newAvailability);
  } catch (error) {
    next(error);
  }
});

// Get logged in user's organization's availability
router.get("/availability", requireToken, async (req, res, next) => {
  try {
    const targetOrgId = req.user.organizationId;
    const targetOrg = await Organization.findByPk(targetOrgId);
    res.json(targetOrg.availabilityStatus);
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
    });
    res.json(targetOrg);
  } catch (error) {
    next(error);
  }
});

// Update informatino about the organization of currently logged in user
router.put("/", requireToken, async (req, res, next) => {
  try {
    const updateFields = req.body.updateFields;
    const targetOrg = req.user.organizationId;

    const updatedOrg = await Organization.update(updateFields, {
      where: { id: Number(targetOrg) },
    });
    res.json(updatedOrg);
  } catch (error) {
    next(error);
  }
});
