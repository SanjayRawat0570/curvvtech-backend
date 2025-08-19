const Joi = require('joi');

const registerDeviceSchema = Joi.object({
  name: Joi.string().min(3).required(),
  type: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive').default('active'),
});

const updateDeviceSchema = Joi.object({
  name: Joi.string().min(3),
  type: Joi.string(),
  status: Joi.string().valid('active', 'inactive'),
}).min(1); 

const heartbeatSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive').required(),
});

module.exports = { registerDeviceSchema, updateDeviceSchema, heartbeatSchema };