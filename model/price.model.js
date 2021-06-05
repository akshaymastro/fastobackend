const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new mongoose.Schema({
  city_class: {
    type: String,
  },
  base_rate: {
    type: String,
  },
  fulecharge: {
    type: String,
  },
  
});

const Price = mongoose.model("Price", PriceSchema);

module.exports = Price;
