const User = require("../models/User");

module.exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

module.exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports.findUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};
