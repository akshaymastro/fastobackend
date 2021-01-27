const responseHandler = require("../helpers/responseHandler");
const axios = require("axios");
const User = require("../model/User.model");
const Driver = require("../model/Driver.model");
const { googleAPI } = require("../helpers/googleLocationAPI");

exports.userLiveLocation = async (req, res, next) => {
  const { place, latitudes, longitudes, radius } = req.body;
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const data = await googleAPI(place, latitudes, longitudes, radius);
    if (!data) {
      responseHandler.failure(res, "something went wrong", 400);
    }
    const user = await User.findOneAndUpdate(
      { _id: decoded._id },
      { currentLocation: place }
    );
    responseHandler.data(res, user, 200);
  } catch (error) {
    next(error);
  }
};

exports.driverLiveLocation = async (req, res, next) => {
  const { place, latitudes, longitudes, radius } = req.body;
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const data = await googleAPI(place, latitudes, longitudes, radius);
    if (!data) {
      responseHandler.failure(res, "something went wrong", 400);
    }
    const driver = await Driver.findOneAndUpdate(
      { _id: decoded._id },
      { currentLocation: place }
    );
    responseHandler.data(res, driver, 200);
  } catch (error) {
    next(error);
  }
};
