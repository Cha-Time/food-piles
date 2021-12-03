const jwt = require("jsonwebtoken");
const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next(); //need to call so it doesnt hang here and goes forward
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Bad Request. User is not an admin.");
  } else {
    next(); //user is allowed to move forward
  }
};

const isCurrentUser = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = await jwt.verify(token, process.env.JWT);
  if (parseInt(req.params.userId) === id) {
    next();
  } else {
    return res.status(403).send("Bad request. User verification error"); //user is allowed to move forward
  }
};

const isAdminOrCurrentUser = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = await jwt.verify(token, process.env.JWT);
  if (parseInt(req.params.userId) === id || req.user.isAdmin) {
    next();
  } else {
    return res
      .status(403)
      .send("Bad request. User verification error."); //user is allowed to move forward
  }
};

module.exports = {
  requireToken,
  isAdmin,
  isCurrentUser,
  isAdminOrCurrentUser,
};
