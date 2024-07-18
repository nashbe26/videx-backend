const express = require("express");

const {
  LOGGED_USER,
  SUPER_ADMIN,
  authorize,
} = require("../middleware/jwt.auth");
const {
  createVidange,
  getVidangeByMyId,
  getVidangeById,
} = require("../controller/vidange.controller");

const router = express.Router();

router.post("/create", authorize([LOGGED_USER, SUPER_ADMIN]), createVidange);

router.get(
  "/get-one/:id",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  getVidangeById
);

router.get(
  "/get-my-vidange",
  authorize([LOGGED_USER, SUPER_ADMIN]),
  getVidangeByMyId
);

module.exports = router;
