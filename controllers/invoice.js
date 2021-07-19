const Invoice = require("../model/Invoice.model");
const responseHelper = require("../helpers/response");

exports.createinvoice = async (req, res, next) => {
  try {
    const invoice = await new Invoice(req.body).save();
    responseHelper.success(res, "Invoice created SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

// exports.updateCity = async (req, res, next) => {
//   console.log(req.body.id, req.body);
//   try {
//     await City.updateOne({ _id: req.body._id }, { ...req.body });
//     responseHelper.success(res, "City Updated SuccessFully", 200);
//   } catch (e) {
//     next(e);
//   }
// };

exports.deleteInvoice = async (req, res, next) => {
  console.log(req.params._id);
  try {
    console.log("delete");
    await Invoice.deleteOne({ _id: req.params._id });
    responseHelper.success(res, "Invoice Deleted SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.getinvoice = async (req, res, next) => {
  try {
    let allinvoice = await Invoice.find({});

    responseHelper.data(res, allinvoice, 200);
  } catch (e) {
    next(e);
  }
};
