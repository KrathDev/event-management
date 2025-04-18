const User = require("../models/User");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const findUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
