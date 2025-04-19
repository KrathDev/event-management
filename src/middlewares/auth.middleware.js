const jwt = require("jsonwebtoken");
const isUser = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({ message: "Token không tồn tại!" });
  }
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

const isAdmin = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({ message: "Token không tồn tại!" });
  }
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }

  next();
};

module.exports = {
  isUser,
  isAdmin,
};
