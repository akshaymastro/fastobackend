const City = require("../model/city.model");
const responseHelper = require("../helpers/response");

exports.createCity = async (req, res, next) => {
  try {
    const city = await new City(req.body).save();
    responseHelper.success(res, "City created SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateCity = async (req, res, next) => {
  try {
    await City.updateOne({ _id: req.body._id }, { ...req.body });
    responseHelper.success(res, "City Updated SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.deleteCity = async (req, res, next) => {
  try {
    await City.deleteOne({ _id: req.body._id });
    responseHelper.success(res, "City Deleted SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.getCities = async (req, res, next) => {
  try {
    let allcities = await City.find({});

    responseHelper.data(res, allcities, 200);
  } catch (e) {
    next(e);
  }
};
