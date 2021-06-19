const User = require("../model/User.model");
const Driver = require("../model/Driver.model");
const { sendSMS } = require("../utils/sendSms");
const otp = require("otp-generator");
const responseHandler = require("../helpers/responseHandler");
const jwtToken = require("../helpers/jwt");
const axios = require("axios");

exports.GetUser = async (req, res, next) => {
  try {
    const { Mobile } = req.body;
    const user = await User.findOne({ Mobile: req.user.user.Mobile });
    responseHandler.data(res, user, 200);
  } catch (err) {
    next(err);
  }
};

//Login Passenger
exports.loginUser = async (req, res, next) => {
  const { Mobile, otp, userType } = req.body;

  try {
    if (userType === "user") {
      const user = await User.findOne({ Mobile });
      console.log(user.otp, "My Otp");
      console.log(user.userType, "userType");
      console.log(otp, "otppspspsp");
      console.log(user.otp == otp, "otp check");
      if (user.otp == otp) {
        const token = await jwtToken.createNewToken(user);
        responseHandler.data(
          res,
          {
            token,
            is_profileUpdated: user.is_profileUpdated,
            new_user: user.is_profileUpdated == true ? false : true,
          },
          200
        );
      } else {
        throw Error("Otp is Incorrect");
      }
    } else {
      const driver = await Driver.findOne({ Mobile });
      console.log(driver);
      console.log(driver.otp, "My Otp");
      console.log(driver.userType, "userType");
      console.log(driver, "otppspspsp");
      console.log(driver.otp == otp, "otp check");
      if (driver.otp == otp) {
        const token = await jwtToken.createNewToken(driver);
        responseHandler.data(
          res,
          {
            token,
            is_profileUpdated: driver.is_profileUpdated,
            new_user: driver.is_profileUpdated == true ? false : true,
          },
          200
        );
      } else {
        throw Error("Otp is Incorrect");
      }
    }
  } catch (err) {
    next(err);
  }
};

//Login Driver
exports.loginDriver = async (req, res, next) => {
  const { Mobile, OTP } = req.body;
  try {
    const driver = await Driver.findOne({ Mobile });

    if (driver.otp == OTP) {
      const token = await jwtToken.createNewToken(driver);
      responseHandler.data(
        res,
        {
          token,
        },
        200
      );
    } else {
      throw Error("Otp is Incorrect");
    }

    //const token = await jwtToken.createNewToken(driver);
    //responseHandler.token(res, token, 200);
  } catch (e) {
    next(e);
  }
};

//Send OTP
//OTP is sent to user
//OTP is to be stored in react native async storage
//if sent OTP == Entered OTP
//then enter the app
exports.SendOTP = async (req, res, next) => {
  const { Mobile } = req.body;
  const { userType } = req.body;
  console.log(Mobile);
  console.log(userType, "userType");
  try {
    const GeneratedOtp = otp.generate(5, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    console.log(req.body.Mobile);
    await sendSMS(Mobile, GeneratedOtp);
    console.log(userType);
    sentotp = Object.assign({
      otp: GeneratedOtp,
    });
    console.log(Mobile, "Mobileee");
    console.log(userType, "dfufh");
    if (userType === "user") {
      const user = await User.findOne({ Mobile });

      console.log(user);
      if (!user) {
        new User({ Mobile, otp: GeneratedOtp,userType }).save();
      } else {
        const updateUser = await User.updateOne(
          { Mobile },
          { otp: GeneratedOtp,userType }
        );
      }
      console.log(GeneratedOtp, "new otp");
      responseHandler.data(res, { otp: GeneratedOtp }, 200);
    } else {
      const driver = await Driver.findOne({ Mobile });

      console.log(driver);
      if (!driver) {
        new Driver({ Mobile, otp: GeneratedOtp,userType }).save();
      } else {
        const updateUser = await Driver.updateOne(
          { Mobile },
          { otp: GeneratedOtp,userType }
        );
      }
      console.log(GeneratedOtp, "new otp");
      responseHandler.data(res, { otp: GeneratedOtp }, 200);
    }
  } catch (err) {
    next(err);
  }
};

//Create User
exports.createUser = async (req, res, next) => {
  const { Mobile } = req.body;

  try {
    const user = await User.findOne({ Mobile });

    if (user) {
      return responseHandler.failure(res, "user is already register.", 400);
    }

    const response = await new User({ Mobile }).save();
    responseHandler.data(res, response, 200);
  } catch (err) {
    next(err);
  }
};

//Create Driver
exports.createDriver = async (req, res, next) => {
  const { Mobile } = req.body;

  try {
    const driver = await Driver.findOne({ Mobile });

    if (driver) {
      return responseHandler.failure(res, "user is already register.", 400);
    }

    const response = await new Driver({ Mobile }).save();
    responseHandler.data(res, response, 200);
  } catch (err) {
    next(err);
  }
};

//Send Otp To Driver
exports.SendOTPToDriver = async (req, res, next) => {
  const { Mobile } = req.body;
  const { userType } = req.body;
  try {
    const GeneratedOtp = otp.generate(5, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    console.log(req.body.Mobile);
    await sendSMS(Mobile, GeneratedOtp);

    sentotp = Object.assign({
      otp: GeneratedOtp,
    });
    console.log(Mobile, "Mobileee");
    const driver = await Driver.findOne({ Mobile });
    console.log(driver);
    if (!driver) {
      new Driver({ Mobile, otp: GeneratedOtp }).save();
    } else {
      const updateDriver = await Driver.updateOne(
        { Mobile },
        { userType },
        { otp: GeneratedOtp }
      );
    }
    console.log(GeneratedOtp);
    responseHandler.data(res, { otp: GeneratedOtp }, 200);
  } catch (err) {
    next(err);
  }
};
