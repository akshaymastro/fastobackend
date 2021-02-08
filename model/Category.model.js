const mongoose = require("mongoose");

const goodCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
  category_image: {
    type: Array,
  },
});

const GoodsType = mongoose.model("GoodsType", goodCategorySchema);

module.exports = GoodsType;
