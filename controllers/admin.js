const User = require("../model/User.model");
const City = require("../model/city.model");
const Admin = require("../model/Admin.model");
const bcrypt = require("bcrypt");
const responseHandler = require("../helpers/responseHandler");
const jwtToken = require("../helpers/jwt");
const adminValidator = require("../validators/adminValidator");
const responseHelper = require("../helpers/response");

exports.GetAllUsers = async (req, res) => {
  try {
    getallusers = await User.find({});
    return responseHelper.data(res, getallusers, 200);
  } catch (error) {
    responseHelper.failure(
      res,
      `${error} From Admin Part (Api Name: GetAllUsers)`,
      400
    );
  }
};

exports.GetAllCities = async (req, res, next) => {
  try {
    const getallcity = await City.find({});
    return responseHelper.data(res, data, 200);
  } catch (e) {
    next(e);
  }
};

exports.adminlogin = async (req, res, next) => {
  try {
    const userForm = await adminValidator.login.validateAsync(req.body);
    const { email, password } = userForm;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      responseHandler.failure(res, `admin is not register.`, 400);
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      responseHandler.failure(res, `Password is inncorrect.`, 400);
    }
    const token = await jwtToken.createNewToken(admin);
    responseHandler.token(res, token, 200);
  } catch (err) {
    next(err);
  }
};

exports.adminCreate = async (req, res, next) => {
  try {
    const userForm = await adminValidator.register.validateAsync(req.body);
    const { email } = userForm;
    const admin = await Admin.findOne({ email });

    if (admin) {
      return responseHandler.failure(res, "user is already register.", 400);
      console.log(res);
    }

    await new Admin(userForm).save();
    responseHandler.success(res, `admin created successfully`, 200);
  } catch (err) {
    next(err);
  }
};

exports.adminDelete = async (req, res, next) => {
  try {
    await Admin.deleteOne({ _id: req.params.id });
    responseHandler.success(res, `admin delete successfully`, 200);
  } catch (err) {
    next(err);
  }
};

exports.adminList = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    if (!admin) {
      responseHandler.failure(res, "user is already register.", 400);
    }
    responseHandler.data(res, admin, 200);
  } catch (err) {
    next(err);
  }
};
exports.adminUpdate=async(req,res,next)=>{
  try{
    console.log(req.body._id);
    await Admin.updateOne({ _id:req.body._id }, { ...req.body });
  
    responseHelper.success(res, "Admin Updated SuccessFully", 200);


  }
  catch(err){
    next(err);
  }
};
