"use strict";
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const register = Joi.object().keys({
  password: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email(),
  mobile: Joi.string(),
  role: Joi.string(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  register,
  login,
};
