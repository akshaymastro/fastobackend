const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Mobile: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  rideHistory: [],
  ongoingRide: {
    type: String,
    required: true,
  },
  driverTicket: {
    type: String,
    required: true,
  },
  chatSupport: {
    type: String,
    required: true,
  },
  driverNofifications: {
    type: String,
    required: true,
  },
  driverInvoice: {
    type: String,
    required: true,
  },
  walletMoney: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  memberType: {
    type: String,
    required: true,
  },
  couponAvailable: {
    type: String,
    required: true,
  },
  driverAadhaar: {
    type: String,
    required: true,
  },
  driverPan: {
    type: String,
    required: true,
  },
  driverLic: {
    type: String,
    required: true,
  },
  driverRc: {
    type: String,
    required: true,
  },
  driverCategory: {
    type: String,
    required: true,
  },
  driverInsurance: {
    type: String,
    required: true,
  },
  driverNCR: {
    type: String,
    required: true,
  },
  activeStatus: {
    type: String,
    required: true,
  },
  totalKM: {
    type: String,
    required: true,
  },
  activeHrsRecord: {
    type: String,
    required: true,
  },
});

driverSchema.index({ currentLocation: "2dsphere" });
const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
