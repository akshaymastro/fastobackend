const User = require("../model/User.model");
const City = require("../model/city.model");
const responseHelper = require("../helpers/response");

exports.GetAllUsers = async (req, res) => {
  try {
    getallusers = await User.find({});
    return responseHelper.data(res, getallusers, 200);
  } catch (error) {
    responseHelper.failure(
      res,
      `${error} From Admin Part (Api Name: GetAllUsers)`,
      400
    );
  }
};

exports.GetAllCities = async (req, res, next) => {
  try {
    const getallcity = await City.find({});
    return responseHelper.data(res, data, 200);
  } catch (e) {
    next(e);
  }
};
