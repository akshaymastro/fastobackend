const User = require("../model/User.model");
const Driver = require("../model/Driver.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtSecret");
const axios = require("axios");
const responseHelper = require("../helpers/response");
const otp = require("otp-generator");

exports.GetUser = async (req, res) => {
  try {
    const { Mobile } = req.body;
    await User.findOne({ Mobile: Mobile }).then((Response) => {
      responseHelper.data(res, Response, 200);
    });
  } catch (err) {
    responseHelper.failure(res, err, 400);
  }
};

//Login Passenger
exports.loginUser = async (req, res) => {
  const { Mobile } = req.body;

  const user = await User.findOne({ Mobile });

  if (user) {
    const token = jwt.sign({ completeUser: user }, jwtSecret);
    responseHelper.data(res, { token: token, user: user }, 200);
  } else {
    try {
      var Newuser = new User();
      Newuser.Mobile = req.body.Mobile;
      Newuser.save((err, user) => {
        if (err) {
          responseHelper.failure(res, "Error in creating a user", 400);
        } else {
          const token = jwt.sign({ completeUser: user }, jwtSecret);
          responseHelper.data(res, { token: token, user: user }, 200);
        }
      });
    } catch (err) {
      responseHelper.failure(
        res,
        `Problem in CreateUser API in controller/auth.js`,
        400
      );
    }
  }
};

//Login Driver
exports.loginDriver = async (req, res) => {
  const { Mobile } = req.body;

  const driver = await Driver.findOne({ Mobile });

  if (driver) {
    const token = jwt.sign({ completeDriver: driver }, jwtSecret);
    responseHelper.data(res, { token: token, user: driver }, 200);
  }
  responseHelper.failure(
    res,
    `The driver with mobile ${Mobile} does not exist`,
    400
  );
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
    await axios
      .get(
        `http://125.16.147.178/VoicenSMS/webresources/CreateSMSCampaignGet?ukey=OqdXRL50BekORDoAW8eCQH4uT&msisdn=${Mobile}&language=0&credittype=2&senderid=GOMRKT&templateid=0&message=${GeneratedOtp}&filetype=2`
      )
      .then((data) => {
        sentotp = Object.assign(
          {
            otp: GeneratedOtp,
          },
          data.data
        );
        responseHelper.data(res, sentotp, 200);
      })
      .catch((err) => responseHelper.failure(res, err, 400));
  } catch (err) {
    responseHelper.failure(res, err, 500);
  }
};

//Create User
exports.createUser = async (req, res) => {
  try {
    var user = new User();
    user.Mobile = req.body.Mobile;
    user.save((err, data) => {
      if (err) {
        responseHelper.failure(res, "Error in creating a user", 400);
      } else {
        responseHelper.data(res, data, 200);
      }
    });
  } catch (err) {
    responseHelper.failure(
      res,
      `Problem in CreateUser API in controller/auth.js`,
      400
    );
  }
};

//Create Driver
exports.createDriver = async (req, res) => {
  try {
    var driver = new Driver();
    driver.Mobile = req.body.Mobile;
    driver.save(async (err, data) => {
      if (err) {
        responseHelper.failure(res, "Error in creating a user", 400);
      } else {
        responseHelper.data(res, data, 200);
      }
    });
  } catch (err) {
    responseHelper.failure(
      res,
      `Problem in CreateUser API in controller/auth.js`,
      400
    );
  }
};
