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

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required()
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};

module.exports = { schemas };
