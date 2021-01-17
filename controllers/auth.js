const User = require("../model/User.model");
const Driver = require("../model/Driver.model");
const otp = require("otp-generator");
const sendSMS = require("../utils/sendSms");
const responseHandler = require("../helpers/responseHandler");
const jwtToken = require("../helpers/jwt");

exports.GetUser = async (req, res, next) => {
  try {
    const { Mobile } = req.body;
    const user = await User.findOne({ Mobile: Mobile });
    responseHandler.data(res, user, 200);
  } catch (err) {
    next(err);
  }
};

//Login Passenger
exports.loginUser = async (req, res, next) => {
  const { Mobile } = req.body;
  try {
    const user = await User.findOne({ Mobile });
    const token = "";
    if (user) {
      token = await jwtToken.createNewToken(user);
    } else {
      var Newuser = new User();
      Newuser.Mobile = req.body.Mobile;
      Newuser.save(async (err, user) => {
        if (err) {
          next(err);
        } else {
          token = await jwtToken.createNewToken(user);
        }
      });
      responseHandler.token(res, token, 200);
    }
  } catch (err) {
    next(err);
  }
};

//Login Driver
exports.loginDriver = async (req, res, next) => {
  try {
    const { Mobile } = req.body;

    const driver = await Driver.findOne({ Mobile });

    if (driver) {
      const token = await jwtToken.createNewToken(driver);
      responseHandler.token(res, token, 200);
    }
  } catch (e) {
    next(e);
  }
};

//Send OTP
//OTP is sent to user
//OTP is to be stored in react native async storage
//if sent OTP == Entered OTP
//then enter the app
exports.SendOTP = async (req, res) => {
  try {
    const { Mobile } = req.body;
    const GeneratedOtp = otp.generate(5, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    const res = await sendSMS(Mobile, GeneratedOtp);
    sentotp = Object.assign(
      {
        otp: GeneratedOtp,
      },
      data.data
    );
    responseHandler.data(res, { otp: sentotp }, 200);
  } catch (err) {
    next(err);
  }
};

//Create User
exports.createUser = async (req, res, next) => {
  try {
    var user = new User();
    user.Mobile = req.body.Mobile;
    const response = await user.save();
    responseHandler.data(res, response, 200);
  } catch (err) {
    next(err);
  }
};

//Create Driver
exports.createDriver = async (req, res, next) => {
  try {
    var driver = new Driver();
    driver.Mobile = req.body.Mobile;
    const response = await driver.save();
    responseHandler.data(res, response, 200);
  } catch (err) {
    next(err);
  }
};
