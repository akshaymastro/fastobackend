const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
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
  Mobile: {
    type: Number,
    required: true,
  },
  currentLocation: {
    type: String,
  },
  pickupLocation: {
    type: String,
  },
  dropLocation: {
    type: String,
  },
  rideHistory: [{ type: Schema.Types.ObjectId, ref: "Ride" }],
  ongoingRide: {},
  userTicket: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  chatSupport: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  userNofifications: [{}],
  userInvoice: [{}],
  walletMoney: {
    type: String,
  },
  offerGiven: [{}],
  offerUsed: [{}],
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
    type: Number,
  },
  memberType: {
    type: String,
  },
  couponAvailable: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
