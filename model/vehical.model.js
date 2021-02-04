const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicalSchema = new mongoose.Schema({
  vehical_name: {
    type: String,
  },
  vehical_capacity: {
    type: String,
  },
  vehical_size: {
    type: String,
  },
  about_vehical: {
    type: String,
  },
  vehical_price: {
    type: Number,
  },
  vehical_KM: {
    type: Number,
  },
  vehical_image: {
    type: String,
  },
});

const Vehical = mongoose.model("Vehical", vehicalSchema);

module.exports = Vehical;
