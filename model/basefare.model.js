const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new mongoose.Schema({
  class_name: {
    type: String,
  },
  fuelcharge:{

    type:String,
  },
  basefare:{
    type: Array
  },
  waitingcharge:{

    type:String,
  }
  
});

const Price = mongoose.model("Price", PriceSchema);

module.exports = Price;
