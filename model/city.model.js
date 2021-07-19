const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new mongoose.Schema({
  city_name: {
    type: String,
  },
  state_name: {
    type: String,
  },
  country: {
    type: String,
  },
  city_class: {
    type: String,
  },
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
