const Joi = require('joi');

const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    categories: Joi.string().required(),
    sub_categories: Joi.string().required(),
    quantity: Joi.number().min(0),
    is_balance: Joi.boolean().required(),
    weight: Joi.number(),
    max_weight: Joi.number(),
    max_quantity: Joi.number(),
    max_weight: Joi.number(),
    max_weight: Joi.number(),
    photos: Joi.array(),
    id:Joi.string(),
    statusProd:Joi.string()
  });


  module.exports = {
    productSchema
}