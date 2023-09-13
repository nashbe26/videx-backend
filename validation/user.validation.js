const Joi = require('joi');

 const userSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string(),
  email: Joi.string().email().required(),
  tel: Joi.string()
    .pattern(/^\d{8}$/)
    .message('Phone number must be a 10-digit number')
    .required(),
});


module.exports = {
    userSchema
}