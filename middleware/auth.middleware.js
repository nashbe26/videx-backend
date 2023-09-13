const { registrationSchema, loginSchema } = require("../validation/auth.validation");

function validateUser(req, res, next) {

  
  const { error } = registrationSchema.validate(req.body);

  if (error) {
    // Handle validation errors
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
}

function validateLogin(req,res,next){
    
  console.log(req.body);
    const { error } = loginSchema.validate(req.body);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
  
    // If validation passes, proceed to the next middleware or route handler
    next();
}


module.exports = {
  validateUser,
  validateLogin
};