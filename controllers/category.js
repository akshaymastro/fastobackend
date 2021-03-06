const CategoryModel = require("../model/Category.model");
const responseHandler = require("../helpers/responseHandler");
const UploadHelper = require("../helpers/uploadImage");
exports.create = async (req, res, next) => {
  console.log(req);
  try {

    if (req.files.length > 0) {
      console.log("helloeooeooe");
      mediaUrl = await UploadHelper.s3Upload(req.files[0]);
      req.body.category_image = mediaUrl.link;
    } else {
      console.log("else");
    }

    const newCategory = await CategoryModel(req.body).save();
    responseHandler.success(res, "Category Created SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {

    
    if (req.files.length > 0) {
      console.log("helloeooeooe");
      mediaUrl = await UploadHelper.s3Upload(req.files[0]);
      req.body.category_image = mediaUrl.link;
    } else {
      console.log("else");
    }


    const updatedCategory = await CategoryModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    console.log(updatedCategory, "vehicall");
    responseHandler.success(res, "Category Updated SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await CategoryModel.deleteOne({
      _id: req.params.id,
    });
    responseHandler.success(res, "Good Delete SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    responseHandler.data(res, categories, 200);
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const categories = await CategoryModel.findOne({ _id: req.body._id });
    responseHandler.data(res, categories, 200);
  } catch (e) {
    next(e);
  }
};
