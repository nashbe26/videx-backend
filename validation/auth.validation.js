const Joi = require('joi');

 const registrationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string(),
  tel: Joi.string()
    .pattern(/^\d{8}$/)
    .message('Phone number must be a 8-digit number')
    .required(),
});


 const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});


module.exports = {
    registrationSchema,
    loginSchema
}

