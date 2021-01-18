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
exports.UpdateFields = async (req, res) => {
  try {
    const authheader = req.get("Authorization");
    jwt.verify(authheader, jwtSecret, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("data here" + data.completeUser.Mobile);
        const {
          firstName,
          lastName,
          email,
          address,
          state,
          city,
          pincode,
        } = req.body;
        await User.findOneAndUpdate(
          { Mobile: data.completeUser.Mobile },
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            state: state,
            city: city,
            pincode: pincode,
          }
        ).then((data) => res.send(data));
      }
    });
  } catch (error) {
    console.log(
      error + "Error from UpdateFields API in user.js file in controllers"
    );
  }
};

//Delete user
exports.DeleteUser = async (req, res, next) => {
  try {
    const authheader = req.get("Authorization");
    const decoded = await jwtToken.decryptToken(authheader);
    await User.findByIdAndDelete({ _id: decoded._id });
    responseHandler.success(res, "User Deleted SuccessFully", 200);
  } catch (error) {
    next(error);
  }
};

//Update Current Location
exports.UpdateCurrentLocation = async (req, res) => {
  try {
    const authheader = req.get("Authorization");
    jwt.verify(authheader, jwtSecret, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const { currentLocation } = req.body;
        await User.findOneAndUpdate(
          { _id: data.completeUser._id },
          {
            currentLocation: currentLocation,
          }
        ).then((data) => res.send(data));
      }
    });
  } catch (error) {
    console.log(
      error +
        "Error from UpdateCurrentLocation API in user.js file in controllers"
    );
  }
};

//Update Profile Picture
exports.UpdateUser = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const decoded = jwtToken.decryptToken(token);
    console.log(decoded, "decodedd");
    await User.findOneAndUpdate(
      { _id: decoded._id },
      {
        ...req.body,
      }
    );
    responseHandler.success(res, "Profile Picture Updated Successfully", 200);
  } catch (error) {
    next(error);
  }
};
