const mongoose = require("mongoose");

const goodCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
  category_image: {
    type: String,
  },
});

const Offer = mongoose.model("Offer", goodCategorySchema);

module.exports = Offer;
