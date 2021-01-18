const User = require("../model/User.model");
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
