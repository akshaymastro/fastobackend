const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  Mobile: {
    type: String,
    required: true,
  },
  is_profileUpdated: {
    type: Boolean,
    default: false,
  },
  currentLocation: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
    },
  },
  rideHistory: [],
  ongoingRide: {
    type: Array,
  },
  driverTicket: {
    type: String,
  },
  chatSupport: {
    type: String,
  },
  driverNofifications: {
    type: String,
  },
  driverInvoice: {
    type: String,
  },
  walletMoney: {
    type: String,
  },
  token: {
    type: String,
  },
  dp: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  memberType: {
    type: String,
  },
  couponAvailable: {
    type: String,
  },
  driverAadhaar: {
    type: String,
  },
  driverPan: {
    type: String,
  },
  driverLic: {
    type: String,
  },
  driverRc: {
    type: String,
  },
  driverCategory: {
    type: String,
  },
  driverInsurance: {
    type: String,
  },
  driverNCR: {
    type: String,
  },
  activeStatus: {
    type: String,
  },
  totalKM: {
    type: String,
  },
  activeHrsRecord: {
    type: String,
  },
});

driverSchema.index({ currentLocation: "2dsphere" });
const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
