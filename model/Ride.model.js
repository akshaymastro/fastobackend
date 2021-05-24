const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideSchema = new mongoose.Schema({
   ByUserID: {
 type:Schema.Types.ObjectId,
ref:"User"
    // type:String
   },
  pickUpLocation: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
     //enum: ["Point"], // 'location.type' must be 'Point'
      //required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  dropLocation: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      //enum: ["Point"], // 'location.type' must be 'Point'
      //required: true,
    },
    coordinates: {
      type: [Number],
      //required: true,
    },
  },
  Kms: {
    type: String,
   //required: true,
  },
  goodType: {
    type: String,
  },
  pickupName: {
    type: String,
  },
  pickupNumber: {
    type: Number,
  },
  receivrName: {
    type: String,
  },
  receivrNumber: {
    type: Number,
  },
Driver:{
type:String,
},  
  vehicalSelected: {
    type: Schema.Types.ObjectId,
    ref: "Vehical",
  },
  paymentType: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  orderStatus: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  couponApplied: {
    type: String,
  },
  AcceptedByDriverID: {
    type: String,
  },
  AcceptedAt: {
    type: String,
  },
  PickedUpAt: {
    type: String,
  },
  RecivedAt: {
    type: String,
  },
  rating: {
    type: String,
  },
  comment: {
    type: String,
  },
  suggestion: {
    type: String,
  },
  status: {
    type: String,
  },
  otp: {
    type: String,
  },
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
