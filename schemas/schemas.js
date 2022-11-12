const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  email: Joi.string(),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const emailType = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailType).required()
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailType).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailType).required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};

module.exports = { schemas };
