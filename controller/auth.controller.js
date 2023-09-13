
const User = require('../models/user');
const moment = require('moment');

const dotenv = require('dotenv')
dotenv.config()

function generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = '';
    const expiresIn = moment().add(process.env.JWT_EXPIRATION_MINUTES, 'minutes');
    return {
      tokenType,
      accessToken,
      refreshToken,
      expiresIn
    };
  }

const register = async (req, res,next) => {
    
    // Create a new user instance
    const user = new User(req.body);
  
    // Save the user to the database
    try {
        const createdUser = await user.save()
        const tokenObject = generateTokenResponse(createdUser, user.token());

        return res.status(200).send(createdUser);    
    }catch(err){
        return next(User.checkDuplicateEmail(err));
    }

  };

  const login = async (req, res,next) => {
  
    // Create a new user instance
    try{

        const {user,accessToken} = await User.findAndGenerateToken(req.body);
        
        const {email} = user
        const token = generateTokenResponse(user, accessToken);

        return res.status(200).json({data:user,token})

    }catch(err){
        console.log(err);
        return res.status(401).json({err})
    }   

  };

  const loginAdmin = async (req, res,next) => {
  
    // Create a new user instance
    try{

        const {user,accessToken} = await User.findAndGenerateToken(req.body);
        console.log(user.role,user.role != "superadmin"  );
        let admin = "superadmin"
        if(user.role != "superadmin" ){
          return res.status(401).json("You Are Not Allowed !!");
        }

        const {email} = user
        const token = generateTokenResponse(user, accessToken);

        return res.status(200).json({data:user,token})

    }catch(err){
        console.log(err);
        return res.status(401).json({err})
    }   

  };

  module.exports = {
    register,
    login,
    loginAdmin
  }