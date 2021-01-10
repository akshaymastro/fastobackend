const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideSchema = new mongoose.Schema({
  ByUserID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fromLocation: {
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
  Kms: {
    type: String,
    required: true,
  },
  goodType: {
    type: String
  },
  pickupName: {
    type: String
  },
  pickupNumber: {
    type: Number
  },
  dropName: {
    type: String
  },
  dropNumber: {
    type: Number
  },
  vehicalSelected: {
    type: String
  },
  paymentType: {
    type: String
  },
  paymentId: {
    type: String,
  },
  orderStatus: {
    type: String
  },
  createdAt: {
    type: String,
  },
  couponApplied: {
    type: String
  },
  AcceptedByDriverID: {
    type: String
  },
  AcceptedAt: {
    type: String
  },
  PickedUpAt: {
    type: String
  },
  DroppedAt: {
    type: String
  },
  rating: {
    type: String
  },
  comment: {
    type: String
  },
  suggestion: {
    type: String
  }
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
