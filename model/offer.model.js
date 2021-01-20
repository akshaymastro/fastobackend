const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offer_name: {
    type: String,
  },
  offer_code: {
    type: String,
  },
  offer_discount: {
    type: String,
  },
  offer_valid_to: {
    type: Date,
  },
  offer_from: {
    type: Date,
  },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
