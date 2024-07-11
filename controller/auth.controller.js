const User = require("../models/user");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/sendEmail");

const dotenv = require("dotenv");
dotenv.config();

function generateTokenResponse(user, accessToken) {
  const tokenType = "Bearer";
  const refreshToken = "";
  const expiresIn = moment().add(process.env.JWT_EXPIRATION_MINUTES, "minutes");
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

const register = async (req, res, next) => {
  // Create a new user instance
  const user = new User(req.body);

  // Save the user to the database
  try {
    const createdUser = await user.save();
    const tokenObject = generateTokenResponse(createdUser, user.token());

    return res.status(200).send(createdUser);
  } catch (err) {
    return next(User.checkDuplicateEmail(err));
  }
};

const login = async (req, res, next) => {
  // Create a new user instance
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);

    const { email } = user;
    const token = generateTokenResponse(user, accessToken);

    return res.status(200).json({ data: user, token });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ err });
  }
};

const loginAdmin = async (req, res, next) => {
  // Create a new user instance
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    console.log(user.role, user.role != "superadmin");
    let admin = "superadmin";
    if (user.role != "superadmin") {
      return res.status(401).json("You Are Not Allowed !!");
    }

    const { email } = user;
    const token = generateTokenResponse(user, accessToken);

    return res.status(200).json({ data: user, token });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ err });
  }
};

const generatePassword = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(404).send("User not found");
    }
    const newPassword = generatePassword();
    console.log(`Generated new password for ${email}: ${newPassword}`);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(`Hashed password for ${email}: ${hashedPassword}`);
    user.password = hashedPassword;
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    console.log(`Password updated in database for ${email}`);
    try {
      await sendEmail(
        email,
        "Password Reset",
        `Your new password is: ${newPassword}`
      );
      console.log(`Email sent to ${email}`);
      res.send("New password sent to your email");
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
      res.status(500).send("Error sending email");
    }
  } catch (error) {
    console.error(`Error resetting password for ${email}:`, error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  loginAdmin,
  forgotPassword,
};
