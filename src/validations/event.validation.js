const Joi = require("joi");

const eventValidation = async (req, res, next) => {
  correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(300).messages({
      "string.empty": "Tiêu đề không được để trống",
      "string.min": "Tiêu đề phải có ít nhất 3 ký tự",
      "string.max": "Tiêu đề không được vượt quá 300 ký tự",
      "any.required": "Tiêu đề là bắt buộc",
    }),
    description: Joi.string().required().min(10).max(1000).messages({
      "string.empty": "Mô tả không được để trống",
      "string.min": "Mô tả phải có ít nhất 10 ký tự",
      "string.max": "Mô tả không được vượt quá 1000 ký tự",
      "any.required": "Mô tả là bắt buộc",
    }),
    date: Joi.date().required().greater("now").messages({
      "date.greater": "Ngày phải lớn hơn ngày hiện tại",
      "any.required": "Ngày là bắt buộc",
    }),
    location: Joi.string().required().min(3).messages({
      "string.empty": "Địa điểm không được để trống",
      "string.min": "Địa điểm phải có ít nhất 3 ký tự",
      "any.required": "Địa điểm là bắt buộc",
    }),
    category: Joi.string().required().messages({
      "string.empty": "Danh mục không được để trống",
      "any.required": "Danh mục là bắt buộc",
    }),
    ticketsAvailable: Joi.number().required().min(0).messages({
      "number.min": "Số lượng vé phải lớn hơn hoặc bằng 0",
      "any.required": "Số lượng vé là bắt buộc",
    }),
    price: Joi.number().required().min(0).messages({
      "number.min": "Giá vé phải lớn hơn hoặc bằng 0",
      "any.required": "Giá vé là bắt buộc",
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

const eventUpdateValidation = async (req, res, next) => {
  correctCondition = Joi.object({
    title: Joi.string().min(3).max(300).messages({
      "string.empty": "Tiêu đề không được để trống",
      "string.min": "Tiêu đề phải có ít nhất 3 ký tự",
      "string.max": "Tiêu đề không được vượt quá 300 ký tự",
    }),
    description: Joi.string().min(10).max(1000).messages({
      "string.empty": "Mô tả không được để trống",
      "string.min": "Mô tả phải có ít nhất 10 ký tự",
      "string.max": "Mô tả không được vượt quá 1000 ký tự",
    }),
    date: Joi.date().greater("now").messages({
      "date.greater": "Ngày phải lớn hơn ngày hiện tại",
    }),
    location: Joi.string().min(3).messages({
      "string.empty": "Địa điểm không được để trống",
      "string.min": "Địa điểm phải có ít nhất 3 ký tự",
    }),
    category: Joi.string().messages({
      "string.empty": "Danh mục không được để trống",
    }),
    ticketsAvailable: Joi.number().min(0).messages({
      "number.min": "Số lượng vé phải lớn hơn hoặc bằng 0",
    }),
    price: Joi.number().min(0).messages({
      "number.min": "Giá vé phải lớn hơn hoặc bằng 0",
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
  eventValidation,
  eventUpdateValidation,
};
