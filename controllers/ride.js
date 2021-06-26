const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");
const { sendSMS } = require("../utils/sendSms");
const otp = require("otp-generator");
exports.GetUserRide = async (req, res, next) => {
  try {
    const { rideId } = req.body.query;
    console.log(req.body.query, "myid");
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const rides = await Ride.findOne({
      ByUserID: decoded._id,
      _id: req.body.query,
    });
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

    console.log(decoded._id);
    const rides = await Ride.find({ ByUserID: decoded._id });
    console.log(rides);
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
  console.log(req.body);
  try {
    const { pickUpLocation, dropLocation, Kms } = req.body;

    const token = req.headers["authorization"];
    console.log(token, "token");
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    console.log(decoded._id);
    console.log(req.body);
    const PickupGeneratedOtp = otp.generate(5, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    console.log(req.body.Mobile);
    await sendSMS(req.body.pickupNumber, PickupGeneratedOtp);
    const ReceiverGeneratedOtp = otp.generate(5, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    console.log(req.body.Mobile);
    await sendSMS(req.body.receivrNumber, ReceiverGeneratedOtp);
    const ride = await new Ride({
      ByUserID: decoded._id,
      pickUpLocation: req.body.pickUpLocation,
      dropLocation: req.body.dropLocation,
      Kms: req.body.kms,
      goodType: req.body.goodType,
      qty: req.body.qty,
      pickupName: req.body.pickupName,
      pickupNumber: req.body.pickupNumber,
      receivrNumber: req.body.receivrNumber,
      receivrName: req.body.receivrName,
      pickUpOtp: PickupGeneratedOtp,
      recevierOtp: ReceiverGeneratedOtp,
      // vehicalSelected:req.body.vehicalSelected,
      paymentType: req.body.paymentType,
      orderStatus: req.body.orderStatus,
      createdAt: req.body.createdAt,
      couponApplied: req.body.couponApplied,
      AcceptedByDriverId: req.body.AcceptedByDriverId,
      PickedUpAt: req.body.PickedUpAt,
      RecivedAt: req.body.RecivedAt,
      rating: req.body.rating,
      comment: req.body.comment,
      suggestion: req.body.suggestion,
      status: req.body.status,
      StartOpt: req.body.StartOpt,
      CompleteOtp: req.body.CompleteOtp,
      message: req.body.message,
    }).save();
    console.log(ride, "userRide");
    const saverideintouser = await User.findByIdAndUpdate(decoded._id, {
      $push: { rideHistory: ride._id },
    });
    responseHandler.data(res, ride, 200);
  } catch (error) {
    next(error);
  }
};
exports.getRideData = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((err) => err);
    const currentRide = await Ride.findById({ _id: req.body._id });
    responseHandler.data(res, currentRide, 200);
  } catch (err) {
    next(err);
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
exports.UpdateDriver = async (req, res, next) => {
  console.log(req.body.id, req.body);
  try {
    await Ride.updateOne({ _id: req.body._id }, { ...req.body });
    responseHandler.data(res, "Driver Updated SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};
