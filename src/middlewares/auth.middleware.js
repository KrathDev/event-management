const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({ message: "Token không tồn tại!" });
  }
  const token = req.headers["authorization"].split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }

  req.user = {
    userId: decoded.userId,
    role: decoded.role,
  };
  next();
};

module.exports = {
  auth,
};
