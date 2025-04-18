const Joi = require("joi");

const registerValidation = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(3).max(30).messages({
      "string.empty": "Tên nguời dùng không được để trống",
      "string.min": "Tên nguời dùng phải có ít nhất 3 ký tự",
      "string.max": "Tên nguời dùng không được quá 30 ký tự",
      "any.required": "Tên nguời dùng là bắt buộc",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email không hợp lệ",
      "string.empty": "Email không được để trống",
      "any.required": "Email là bắt buộc",
    }),
    password: Joi.string().required().min(5).max(30).messages({
      "string.empty": "Mật khẩu không được để trống",
      "string.min": "Mật khẩu phải có ít nhất 5 ký tự",
      "string.max": "Mật khẩu không được quá 30 ký tự",
      "any.required": "Mật khẩu là bắt buộc",
    }),
  });

  try {
    await correctCondition.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error: true,
    });
  }

  next();
};

const loginValidation = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email không hợp lệ",
      "string.empty": "Email không được để trống",
      "any.required": "Email là bắt buộc",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Mật khẩu không được để trống",
      "any.required": "Mật khẩu là bắt buộc",
    }),
  });

  try {
    await correctCondition.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error: true,
    });
  }

  next();
};

module.exports = {
  registerValidation,
  loginValidation,
};
