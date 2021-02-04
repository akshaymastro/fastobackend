const VehicalModel = require("../model/vehical.model");
const responseHandler = require("../helpers/responseHandler");

exports.createVehical = async (req, res, next) => {
  try {
    const newVehical = await VehicalModel(req.body).save();
    console.log(newVehical);
    responseHandler.success(res, "Vehical Created SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateVehical = async (req, res, next) => {
  try {
    const updateVehical = await VehicalModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    console.log(updateVehical, "vehicall");
    responseHandler.success(res, "Vehical Updated SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.deleteVehical = async (req, res, next) => {
  try {
    await VehicalModel.deleteOne({
      _id: req.params.id,
    });
  } catch (e) {
    next(e);
  }
};

exports.getVehicals = async (req, res, next) => {
  try {
    const vehical = await VehicalModel.find();
    responseHandler.data(res, vehical, 200);
  } catch (e) {
    next(e);
  }
};
