const User = require("../model/User.model");
const bcrypt = require("bcrypt");
// const jwtSecret = require("../config/jwtSecret");
const { jwtsecret } = process.env;
const jwt = require("jsonwebtoken");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");

exports.GetUser = async (req, res) => {
  try {
    const { Mobile } = req.body;
    await User.findOne({ Mobile: Mobile }).then((Response) => {
      res.send(Response);
      console.log(Response);
    });
  } catch (err) {
    console.log(err);
  }
};

//Update fields
exports.UpdateFields = async (req, res, next) => {
  console.log(req, "authheader");
  const authheader = req.get("Authorization");
  try {
    const userToken = jwtToken.decryptToken(authheader);
    console.log(user, "usertoken");
    if (!userToken) {
      responseHandler.failure(res, "user is not valid.", 400);
    } else {
      const {
        firstName,
        lastName,
        email,
        address,
        state,
        city,
        pincode,
      } = req.body;
      const user = await User.findOneAndUpdate(
        { Mobile: data.user.Mobile },
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
    }
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
    if (!decoded) {
      responseHandler.failure(res, "user token is not present.", 400);
    }

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
    if (!decoded) {
      responseHandler.failure(res, "user token is not present.", 400);
    }
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
    if (!decoded) {
      responseHandler.failure(res, "user token is not present.", 400);
    }
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
