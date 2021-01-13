"use strict";
const Joi = require("joi");

const register = Joi.object({
  password: Joi.string().required().min(6),
  firstName: Joi.string(),
  lastName: Joi.string(),
  userName: Joi.string(),
  email: Joi.string().email(),
  Mobile: Joi.number(),
  dp: Joi.string(),
  address: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  pincode: Joi.number(),
  memberType: Joi.string(),
  couponAvailable: Joi.string(),
});
