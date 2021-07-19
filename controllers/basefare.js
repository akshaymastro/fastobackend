const base = require("../model/basefare.model");
const responseHelper = require("../helpers/response");
const City = require("../model/city.model");

exports.createFuel = async (req, res, next) => {
  try {
    console.log(req.body);
    const FuelCharge = await new base(req.body).save();
    responseHelper.success(res, "FuelCharge Updated SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.createfare = async (req, res, next) => {
  try {
    console.log(req.body.class_name);
    let basefare = [];
    basefare.push({ no_km: req.body.km, fare: req.body.fare });
    req.body.basefare = basefare;
    console.log(basefare);
    const fare = await base.findOneAndUpdate(
      { class_name: req.body.class_name },
      { $push: { basefare: req.body.basefare } }
    );
    responseHelper.success(res, "Fare Added SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.deletefare1 = async (req, res, next) => {
  try {
    const fare = await base.findOneAndUpdate(
      { class_name: req.body.class_name },
      { $pull: { basefare: { no_km: req.body.km } } }
    );
    console.log(fare, "c");
    responseHelper.success(res, "Fare Added SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateFare = async (req, res, next) => {
  console.log(req.body.id, req.body);
  try {
    await base.updateOne(
      { _id: req.params._id },
      {
        $push: {
          basefare: [{ no_of_km: req.body.no_of_km, Price: req.body.Price }],
        },
      }
    );
    responseHelper.success(res, "Fare Updated SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    await base.updateOne(
      { _id: req.body._id },
      {
        ...req.body,
      }
    );
  } catch (e) {
    next(e);
  }
  responseHelper.success(res, "Class Updated Successfully", 200);
};

exports.deleteFare = async (req, res, next) => {
  console.log(req.params._id);
  try {
    console.log("delete");
    await base.deleteOne({ _id: req.params._id });
    responseHelper.success(res, "Fare Deleted SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.getfare = async (req, res, next) => {
  let allcities = await City.find({ city_name: req.body.city_name });
  let class_name = allcities.map((item) => {
    return item.city_class;
  });

  console.log(class_name[0]);
  try {
    if (req.body.km <= 40) {
      let farelist = await base.aggregate([
        { $match: { class_name: class_name[0] } }, // <-- match only the document which have a matching element
        {
          $project: {
            fuelcharge: { fuelcharge: "$fuelcharge" },
            basefare: {
              $filter: {
                input: "$basefare",
                as: "basefare",
                cond: { $eq: ["$$basefare.no_km", req.body.km] }, //<-- filter sub-array based on condition
              },
            },
          },
        },
      ]);
      console.log(farelist);

      //console.log(filter);
      responseHelper.data(res, farelist, 200);
    } else {
      let farelist = await base.aggregate([
        { $match: { class_name: class_name[0] } }, // <-- match only the document which have a matching element
        {
          $project: {
            fuelcharge: { fuelcharge: "$fuelcharge" },
            basefare: {
              $filter: {
                input: "$basefare",
                as: "basefare",
                cond: { $eq: ["$$basefare.no_km", 40] }, //<-- filter sub-array based on condition
              },
            },
          },
        },
      ]);
      console.log(farelist);

      //console.log(filter);
      responseHelper.data(res, farelist, 200);
    }
  } catch (e) {
    next(e);
  }
};
exports.getAllfare = async (req, res, next) => {
  try {
    let Allfare = await base.find({});

    //console.log(filter);
    responseHelper.data(res, Allfare, 200);
  } catch (e) {
    next(e);
  }
};
