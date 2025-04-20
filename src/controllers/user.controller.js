const bcrypt = require("bcrypt");

const userService = require("../services/user.service");
const { generateToken } = require("../utils/jwt");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingEmail = await userService.findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user object
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    console.log(user);

    // Create payload
    const payload = {
      userId: user._id,
      role: user.role,
    };

    // Create token
    const token = generateToken(payload);

    res.status(201).json({
      message: "Đăng kí tài khoản thành công",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Create payload
    const payload = {
      userId: user._id,
      role: user.role,
    };

    // Create token
    const token = generateToken(payload);

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
