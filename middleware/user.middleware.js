const { userSchema } = require("../validation/user.validation");

function validateUpdate(req, res, next) {

  const { error } = userSchema.validate(req.body);

  if (error) {
    // Handle validation errors
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
}


module.exports = {
    validateUpdate
};