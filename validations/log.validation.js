const Joi = require('joi');

const logEntrySchema = Joi.object({
  event: Joi.string().required(),
  value: Joi.number().optional(),
});

module.exports = { logEntrySchema };