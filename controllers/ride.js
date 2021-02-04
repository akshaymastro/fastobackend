const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");

exports.GetUserRide = async (req, res, next) => {
  try {
    const { rideId } = req.query;
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const rides = await Ride.findOne({ ByUserID: decoded._id, _id: rideId });
    if (!rides) {
      responseHandler.failure(res, "no ride is avalable.", 400);
    }
    responseHandler.data(res, rides, 200);
  } catch (error) {
    next(error);
  }
};

exports.GetUserRideList = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const rides = await Ride.find({ ByUserID: decoded._id });
    if (!rides) {
      responseHandler.failure(res, "no ride is avalable.", 400);
    }
    responseHandler.data(res, rides, 200);
  } catch (error) {
    next(error);
  }
};

exports.GetRideList = async (req, res, next) => {
  try {
    const rides = await Ride.find();
    if (!rides) {
      responseHandler.failure(res, "no ride is avalable.", 400);
    }
    responseHandler.data(res, rides, 200);
  } catch (error) {
    next(error);
  }
};
//Create Ride
exports.CreateRide = async (req, res, next) => {
  try {
    const { pickUpLocation, dropLocation, Kms } = req.body;
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const ride = new Ride({
      ByUserID: decoded._id,
      pickUpLocation,
      dropLocation,
      Kms,
    }).save();
    const saverideintouser = await User.findByIdAndUpdate(decoded._id, {
      $push: { rideHistory: ride._id },
    });
    responseHandler.data(res, saverideintouser, 200);
  } catch (error) {
    next(error);
  }
};

//Delete Ride
exports.DeleteRide = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const deleteride = await Ride.findByIdAndDelete({
      _id: req.body.rideid,
    });
    //   res.send(deleteride)
    const deleterideidfromuser = await User.findByIdAndUpdate(decoded._id, {
      $pull: { rideHistory: deleteride._id },
    });
    responseHandler.data(res, deleterideidfromuser, 200);
  } catch (err) {
    next(err);
  }
};
