const JWT = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env;

const createNewToken = (user) => {
  try {
    const payload = {
      user,
    };

    const token = JWT.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });
    return token;
  } catch (err) {
    return err;
  }
};

const resetToken = (id, email) => {
  try {
    const payload = {
      userId: id,
      email: email,
    };
    const token = JWT.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });
    return token;
  } catch (e) {
    return e;
  }
};

const decryptToken = async (token) => {
  try {
    const decodedToken = JWT.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (err) {
    return err;
  }
};

module.exports = { createNewToken, decryptToken, resetToken };
