const mongoose = require("mongoose");

const goodCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
  category_image: {
    type: String,
  },
});

const GoodsType = mongoose.model("GoodsType", goodCategorySchema);

module.exports = GoodsType;
