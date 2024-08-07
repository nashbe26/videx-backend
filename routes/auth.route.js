const express = require("express");
const {
  register,
  login,
  loginAdmin,
  forgotPassword,
} = require("../controller/auth.controller");
const passport = require("passport");

const {
  validateUser,
  validateLogin,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/login", login);
router.post("/loginAdmin", validateLogin, loginAdmin);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    console.log(req.user, "await User.findAndGenerateToken(req.body)");
    //const {user,accessToken} = await User.findAndGenerateToken(req.body);
    res.redirect(
      "https://www.auto-videx.com/social-verif/" +
        req.user.googleAuth.accessToken
    );
  }
);

module.exports = router;
