const CategoryModel = require("../model/Category.model");
const responseHandler = require("../helpers/responseHandler");

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await CategoryModel.save(req.body);
    console.log(newCategory);
    responseHandler.success(res, "Category Created SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await CategoryModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    console.log(updatedCategory, "vehicall");
    responseHandler.success(res, "Category Updated SuccesFully");
  } catch (e) {
    next(e);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await CategoryModel.deleteOne({
      _id: req.params.id,
    });
  } catch (e) {
    next(e);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    responseHandler.data(res, categories, 200);
  } catch (e) {
    next(e);
  }
};
