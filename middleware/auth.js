const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");

module.exports = async (req, res, next) => {
  const authheader = req.get("Authorization");
  if (!authheader) {
    responseHandler.failure(res, "missing authorization header.", 400);
    // return res.status(401).json({ error: "missing authorization header" });
  }

  try {
    // const token = authheader;
    await jwtToken.decryptToken(authheader);
    // jwt.verify(token, jwtsecret);
    next();
  } catch (error) {
    return responseHandler.failure(res, error, 400);
  }
};
