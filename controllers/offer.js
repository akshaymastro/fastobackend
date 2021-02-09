const OfferModel = require("../model/offer.model");
const responseHandler = require("../helpers/responseHandler");

exports.createOffer = async (req, res, next) => {
  try {
    const newOffer = await OfferModel(req.body).save();
    console.log(newOffer);
    responseHandler.success(res, "OfferCreated SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateOffer = async (req, res, next) => {
  try {
    const updateOffer = await OfferModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    console.log(updateOffer, "ssss");
    responseHandler.success(res, "Vehical Updated SuccesFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.deleteOffer = async (req, res, next) => {
  try {
    await OfferModel.deleteOne({
      _id: req.params.id,
    });
    responseHandler.success(res, "Offer Deleted SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.getOffer = async (req, res, next) => {
  try {
    const offer = await OfferModel.find();
    responseHandler.data(res, offer, 200);
  } catch (e) {
    next(e);
  }
};
