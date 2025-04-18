const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../validations/user.validation");
const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/profile", auth, getUserProfile);

module.exports = router;
