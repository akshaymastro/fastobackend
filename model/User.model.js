const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const geocoder = require("../utils/geocoder");

const userSchema = new mongoose.Schema({
  userType:{
    type:String,
    enum:['user','driver']
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  is_profileUpdated: {
    type: Boolean,
    default: false,
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
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
    },
  },
  pickupLocation: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
    },
  },
  pickupDetails: {
    type: Object,
  },
  dropLocation: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
    },
    formattedAddress: String,
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
  otp: {
    type: Number,
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
    enum: ["Normal", "Receiver", "Pickup"],
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

userSchema.pre("save", async function (next) {
  // const loc = await geocoder.geocode(this.address);
  // this.currentLocation = {
  //   type: "Point",
  //   coordinates: [loc[0].longitude, loc[0].latitude],
  //   formattedAddress: loc[0].formattedAddress,
  // };
  // this.address = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
