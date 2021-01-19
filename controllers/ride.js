const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");
//Create Ride
exports.CreateRide = async (req, res, next) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const ride = new Ride();
    ride.ByUserID = decoded._id;
    ride.fromLocation = req.body.fromLocation;
    ride.toLocation = req.body.toLocation;
    ride.Kms = req.body.Kms;
    const newride = await ride.save();
    var saverideintouser = await User.findByIdAndUpdate(decoded._id, {
      $push: { rideHistory: newride._id },
    });
    responseHandler.data(res, saverideintouser, 200);
  } catch (error) {
    next(error);
  }
};

//Delete Ride
exports.DeleteRide = async (req, res) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
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
