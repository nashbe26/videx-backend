const httpStatus = require('http-status');
const passport = require('passport');
const User = require('../models/user')
const createError = require('http-errors')
const SUPER_ADMIN = 'superadmin';
const LOGGED_USER = '_loggedUser';

const handleJWT = (req, res, next, roles) => async (err, user, info) => {

  const error = err || info;

    
  try {
    if (error || !user) {
      throw createError(401,error);
    }
    await req.logIn(user, { session: false });
  } catch (e) {
    return next(createError(401,e));
  }

    if (roles === SUPER_ADMIN) {
        // validate if the "Logged User Id" is the same with "params.userId" (resource Id)
        // only the same logged in user can access the resource Id. (unless it has admin role)
    
    
        if (user.role != 'superadmin' && user.role != 'sousadmin') {
          
          return next(createError(401,"Access Denied ! you don't have permission."));
        }
      }
  if (roles === LOGGED_USER) {

    if (user.role !== 'user' && req.params.userId !== user._id) {
        return next(createError(401,"Access Denied ! you don't have permission."));
    }
  }
  
  
  else if (err || !user) {
    return next(createError(401,err));
}

  req.route.meta = req.route.meta || {};
  req.route.meta.user = user;
  req.route.meta.connectedUser = user;

  return next();
};

exports.LOGGED_USER = LOGGED_USER;
exports.SUPER_ADMIN = SUPER_ADMIN;

exports.authorize = (roles = User.role) => (req, res, next) =>
passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, roles))(req, res, next);

exports.oAuth = (service) => passport.authenticate(service, { session: false });