const jwt = require("jsonwebtoken");

module.exports = auth = ({ isTokenRequired = true, userAllowed = [] }) => {
  return async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(400).json({
        message: "Token not found",
        sucess: false,
        status: 400,
      });
    }
    const decodeInformation = jwt.verify(token, process.env.JWT_SECRET);
  };
};