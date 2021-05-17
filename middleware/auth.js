const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");

module.exports = async (req, res, next) => {
  try {
    const authheader = req.headers["authorization"];

    if (!authheader) {
      responseHandler.failure(res, "missing header authorization.", 400);
    }

    const decodedToken = await jwtToken.decryptToken(authheader);
    req.user = decodedToken;
    next();
  } catch (error) {
    return responseHandler.failure(res, error, 400);
  }
};
