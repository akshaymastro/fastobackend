"use strict";
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const register = Joi.object({
  password: Joi.string().required().min(6),
  firstName: Joi.string(),
  lastName: Joi.string(),
  userName: Joi.string(),
  email: Joi.string().email(),
  Mobile: Joi.number(),
  currentLocation: Joi.string(),
  pickupLocation: Joi.string(),
  dropLocation: Joi.string(),
  rideHistory: Joi.objectId(),
  ongoingRide: Joi.string(),
  userTicket: Joi.objectId(),
  chatSupport: Joi.objectId(),
  userNofifications: Joi.string(),
  userInvoice: Joi.string(),
  walletMoney: Joi.string(),
  dp: Joi.string(),
  address: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  pincode: Joi.number(),
  memberType: Joi.string(),
  couponAvailable: Joi.string(),
});
