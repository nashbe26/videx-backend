const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var createError = require("http-errors");

const roles = ["user", "superadmin"];
const moment = require("moment");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: roles,
    default: "user",
  },
  fav_prod: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Replace 'Product' with the correct model name for favorite products
    },
  ],
  password: {
    type: String,
    minlength: 6,
    maxlength: 128,
  },
  name: {
    type: String,
    maxlength: 128,
  },
  tel: {
    type: String,
  },
  address: {
    type: String,
  },
  photo: {
    type: String,
  },
  googleAuth: {
    id: { type: String },
    accessToken: { type: String },
  },
});

userSchema.pre("save", async function save(next) {
  try {
    // modifying password => encrypt it:
    if (this.isModified("password")) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"

  token() {
    const playload = {
      exp: moment().add(process.env.JWT_EXPIRATION_MINUTES, "minutes").unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.sign(playload, process.env.JWT_SECRET);
  },

  async passwordMatches(password) {
    console.log(password);
    return bcrypt.compare(password, this.password);
  },
});
userSchema.statics = {
  roles,
  checkDuplicateEmail(error) {
    if (error.code === 11000) {
      return createError(500, "email already exists");
    }
    return error;
  },
  token() {
    const playload = {
      exp: moment().add(process.env.JWT_EXPIRATION_MINUTES, "minutes").unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.sign(playload, process.env.JWT_SECRET);
  },
  async findAndGenerateToken(options) {
    const { email, password } = options;
    if (!email) {
      throw createError(err.status, err.message);
    }

    const user = await this.findOne({ email }).populate("fav_prod");

    const err = {
      status: 401,
      isPublic: true,
    };

    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() };
      }
      err.message = "Incorrect email or password";
    } else {
      err.message = "Incorrect email or refreshToken";
    }
    throw createError(err.status, err.message);
  },
  async get(id) {
    try {
      let user;
      console.log(user);
      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await User.findById(id).populate("fav_prod").exec();
      }
      if (user) {
        return user;
      }
    } catch (error) {
      throw createError(httpStatus.NOT_FOUND, "User does not exist");
    }
  },
};

// Create the user model
const User = mongoose.model("User", userSchema);
// Export the user model
module.exports = User;
