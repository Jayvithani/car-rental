const jwt = require("jsonwebtoken");
const DB = require("./../models");

module.exports = auth = (isTokenRequired = true, userAllowed = []) => {
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
    console.log("decodeInformation", decodeInformation);
    const userInformation = await DB.USER.findOne({
      _id: decodeInformation?.userId,
    }).populate("role");
    console.log("userInformation", userInformation);
    const isUserAllowed = userAllowed.find(
      (role) => role === userInformation.role
    );
    if (!isUserAllowed) {
      return res.json({
        messgae: "Unauthorised Acess",
      });
    }
  };
};