const Joi = require('joi');

 const contactSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  content: Joi.string().required(),
  email: Joi.string().email().required(),
  tel: Joi.string()
    .pattern(/^\d{10}$/)
    .message('Phone number must be a 10-digit number')
    .required(),
});


module.exports = {
    contactSchema
}