const jwt = require("jsonwebtoken");
const sendResponse = require("../custom/response");
const {
  TOKEN_MISSING_404,
  TOKEN_EXPIRED_ERROR,
  TOKEN_ERROR_401,
  USER_NOT_FOUND_OBJ,
} = require("../custom/responseMessages");

const isAuthenticated = async (req, res, next) => {
  // check req.header for token
  const token = req.header("x-access-token");
  try {
    if (!token) {
      return sendResponse(res, 404, { tokenExpired: 0 }, TOKEN_MISSING_404);
    }

    let decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded;
    let user = await db.users.findOne({ _id: decoded._id }).lean();
    if (!user || !user.isActive) {
      return sendResponse(res, 401, { userNotFound: 0 }, USER_NOT_FOUND_OBJ);
    }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return sendResponse(res, 401, { tokenExpired: 1 }, TOKEN_EXPIRED_ERROR);
    }
    console.error(err);
    return sendResponse(res, 401, { tokenExpired: 0 }, TOKEN_ERROR_401);
  }
};

module.exports = isAuthenticated;
