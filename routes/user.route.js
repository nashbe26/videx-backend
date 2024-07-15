const express = require("express");
const {
  authorize,
  SUPER_ADMIN,
  LOGGED_USER,
} = require("../middleware/jwt.auth");

const userController = require("../controller/user.controller");
const { validateUpdate } = require("../middleware/user.middleware");
const { uploadImages } = require("../utils/multer");

const router = express.Router();

router.param("userId", userController.load);

router.get("/get-all-User", authorize(SUPER_ADMIN), userController.getAllUser);
router.put(
  "/update",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  userController.updateUser
);
router.put(
  "/update-password",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  userController.updateUserPassword
);
router.get(
  "/get-user",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  userController.loggedIn
);
router.post(
  "/update-user-photo",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  uploadImages,
  userController.updatePhoto
);
router.delete(
  "/delete-user/:ids",
  authorize(SUPER_ADMIN),
  userController.deleteUser
);
router.post(
  "/add-prod-to-fav",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  userController.addToFav
);
router.post(
  "/delete-prod-to-fav",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  userController.deleteToFav
);

module.exports = router;
