const Driver = require("../model/Driver.model");
// const jwtSecret = require("../config/jwtSecret");
const { jwtsecret } = process.env;
const jwt = require("jsonwebtoken");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");
const Ride = require("../model/Ride.model");

exports.getDriver = async (req, res, next) => {
  const { Mobile } = req.body;
  console.log(req.body);
  try {
    const drivers = await Driver.findOne({ Mobile });
    if (!drivers) {
      responseHandler.failure(res, "drivers list not avalable.", 400);
    }
    responseHandler.data(res, drivers, 200);
  } catch (err) {
    next(err);
  }
};

exports.getDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find({});
    if (!drivers) {
      responseHandler.failure(res, "drivers list not avalable.", 400);
    }
    responseHandler.data(res, drivers, 200);
  } catch (err) {
    next(err);
  }
};

//Update fields
exports.UpdateDriverFields = async (req, res, next) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const {
      firstName,
      lastName,
      email,
      address,
      state,
      city,
      pincode,
      driverAadhaar,
      driverPan,
      driverLic,
      driverRc,
    } = req.body;
    const updatedDriver = await Driver.findOneAndUpdate(
      { Mobile: decoded.Mobile },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        state: state,
        city: city,
        pincode: pincode,
        driverAadhaar: driverAadhaar,
        driverPan: driverPan,
        driverLic: driverLic,
        driverRc: driverRc,
      }
    );
    responseHandler.data(res, updatedDriver, 200);
  } catch (error) {
    next(error);
  }
};

//Delete user
exports.DeleteDriver = async (req, res) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    await Driver.findByIdAndDelete({ _id: decoded._id });
    responseHandler.success(res, "Driver Deleted SuccessFully", 200);
  } catch (error) {
    next(error);
  }
};

//Update Current Location
exports.UpdateUser = async (req, res, next) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const data = await Driver.findOneAndUpdate(
      { _id: decoded._id },
      {
        ...req.body,
      }
    );
    responseHandler.data(res, data, 200);
  } catch (error) {
    next(error);
  }
};

//Update Profile Picture
exports.UpdateDriverProfilePicture = async (req, res) => {
  try {
    const authheader = req.get("Authorization");
    jwt.verify(authheader, jwtSecret, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const { dp } = req.body;
        await Driver.findOneAndUpdate(
          { _id: data.completeDriver._id },
          {
            dp: dp,
          }
        ).then((data) => res.send(data));
      }
    });
  } catch (error) {
    console.log(
      error +
        "Error from UpdateDriverProfilePicture API in driver.js file in controllers"
    );
  }
};

exports.UpdateDriver = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    if (!decoded) {
      responseHandler.failure(res, "user token is not present.", 400);
    }
    await Driver.findOneAndUpdate(
      { _id: decoded._id },
      {
        ...req.body,
      }
    );
    responseHandler.data(res, "Driver update successfully.", 200);
  } catch (error) {
    next(error);
  }
};

exports.getNearByVehicals = async (req, res, next) => {
  try {
    const nearByVehicals = await Driver.find({
      currentLocation: { $near: req.body.coordinates, $maxDistance: 20 },
    });

    responseHandler.data(res, { drivers: nearByVehicals }, 200);
  } catch (e) {
    next(e);
  }
};

exports.getNearByRides = async (req, res, next) => {
  try {
    // const index = await Driver.getIndexes({ full: true });
    // console.log(index, "indexx");
    const res1 = await Ride.aggregate(
      [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: req.body.coordinates,
            },
            spherical: true,
            distanceField: "dist.calculated",
            maxDistance: 1000,
          },
        },
      ],
      function (err, shapes) {
        if (err) throw err;
        //console.log( shapes );

        // shapes = shapes.map(function (x) {
        //   delete x.dis;
        //   return new Shape(x);
        // });

        // Shape.populate(shapes, { path: "info" }, function (err, docs) {
        //   if (err) throw err;

        //   console.log(JSON.stringify(docs, undefined, 4));
        // });
      }
    );
    responseHandler.data(res, res1, 200);
  } catch (e) {
    next(e);
  }
};
