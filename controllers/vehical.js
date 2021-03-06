const VehicalModel = require("../model/vehical.model");
const responseHandler = require("../helpers/responseHandler");
const UploadHelper = require("../helpers/uploadImage");
exports.createVehical = async (req, res, next) => {
  try {
    if (req.files.length > 0) {
      console.log("helloeooeooe");
      mediaUrl = await UploadHelper.s3Upload(req.files[0]);
      req.body.vehical_image = mediaUrl.link;
    } else {
      console.log("else");
    }
    console.log(req.body);
    const newVehical = await VehicalModel(req.body).save();
    console.log(newVehical);
    responseHandler.success(res, "Vehical Created SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateVehical = async (req, res, next) => {
  try {

    if (req.files.length > 0) {
      console.log("helloeooeooe");
      mediaUrl = await UploadHelper.s3Upload(req.files[0]);
      req.body.vehical_image = mediaUrl.link;
    } else {
      console.log("else");
    }

    const updateVehical = await VehicalModel.updateOne(
      { _id: req.params.id },
      { ...req.body

       }
    );
    console.log(updateVehical, "vehicall");
    responseHandler.success(res, "Vehical Updated SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.deleteVehical = async (req, res, next) => {
  console.log(req.params, "parammsmsm");
  try {
    await VehicalModel.deleteOne({
      _id: req.params.id,
    });
    responseHandler.success(res, "Vehicle Delete SuccessFully", 200);
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
