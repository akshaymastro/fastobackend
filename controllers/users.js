const User = require("../model/User.model");
const bcrypt = require("bcrypt");
// const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");
const { transporter, mailOptions } = require("../helpers/mailVerification");

exports.GetUser = async (req, res) => {
  try {
    console.log(req.user, "userr");
    const { Mobile } = req.body;
    const user1 = await User.findOne({ Mobile: req.user.user.Mobile });
    if (!user1) {
      responseHandler.failure(res, "user not avalable.", 400);
    }
    responseHandler.data(res, user1, 200);
  } catch (err) {
    next(err);
  }
};

exports.GetUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      responseHandler.failure(res, "users list not avalable.", 400);
    }
    responseHandler.data(res, users, 200);
  } catch (err) {
    next(err);
  }
};

//Update fields
exports.UpdateFields = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const { firstName, lastName, email, address, state, city, pincode } =
      req.body;
    const user = await User.findOneAndUpdate(
      { Mobile: decoded.Mobile },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        state: state,
        city: city,
        pincode: pincode,
      }
    );
    // if (!user) {
    //   responseHandler.failure(res, "user is not update.", 400);
    // }
    responseHandler.data(res, user, 200);
  } catch (error) {
    next(error);
    // console.log(
    //   error + "Error from UpdateFields API in user.js file in controllers"
    // );
  }
};

//Delete user
exports.DeleteUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);

    await User.findByIdAndDelete({ _id: decoded._id });
    responseHandler.success(res, "User Deleted SuccessFully", 200);
  } catch (error) {
    next(error);
  }
};

//Update Current Location
exports.UpdateCurrentLocation = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);

    const { currentLocation } = req.body;
    const data = await User.findOneAndUpdate(
      { _id: decoded._id },
      {
        currentLocation: currentLocation,
      }
    );
    responseHandler.data(res, data, 200);
  } catch (error) {
    next(error);
    // console.log(
    //   error +
    //     "Error from UpdateCurrentLocation API in user.js file in controllers"
    // );
  }
};

//Update Profile Picture
exports.UpdateUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    await User.findOneAndUpdate(
      { _id: decoded._id },
      {
        ...req.body,
      }
    );
    responseHandler.data(res, "user update successfully.", 200);
  } catch (error) {
    next(error);
  }
};

exports.EmailVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const emailToken = await jwtToken.createNewToken(decoded);
    const host = req.get("host");
    const link = "http://" + host + "/verify?emailToken=" + emailToken;
    const user = await User.findOneAndUpdate(
      { _id: decoded._id },
      { email, emailToken }
    );
    if (!user) {
      responseHandler.failure(res, "user is not present.", 400);
    }
    const eailOptions = await mailOptions(email);
    const response = transporter.sendMail(eailOptions);
    if (!response) {
      responseHandler.failure(res, "sending mail error.", 400);
    }
    responseHandler.success(
      res,
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
        link +
        ">Click here to verify</a>",
      200
    );
  } catch (error) {
    next(error);
  }
};

exports.Verification = async (req, res, next) => {
  try {
    const { emailToken } = req.query;
    const user = await User.findOneAndUpdate(
      { emailToken },
      { isEmailVerified: true, emailToken: null }
    );
    if (!user) {
      responseHandler.failure(res, "user is not present.", 400);
    }

    responseHandler.success(res, "your email is verified.", 200);
  } catch (error) {
    next(error);
  }
};
