const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/user.controller");
const { isUser } = require("../middlewares/auth.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../validations/user.validation");
const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/profile", isUser, getUserProfile);

module.exports = router;
