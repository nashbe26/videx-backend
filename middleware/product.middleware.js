const { productSchema } = require("../validation/product.validation");

function validateProduct(req, res, next) {

  const { error } = productSchema.validate(req.body);

  if (error) {
    // Handle validation errors
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
}


module.exports = {
    validateProduct
};