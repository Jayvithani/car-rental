const jwt = require("jsonwebtoken");
const DB = require("./../models");

module.exports = auth = (isTokenRequired = true, userAllowed = []) => {
  return async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
      return res.status(400).json({
        message: "Token not found",
        sucess: false,
        status: 400,
      });
    }
    const decodeInformation = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodeInformation", decodeInformation);
    console.log("userAllowed", userAllowed);

    const userInformation = await DB.USER.findOne({
      _id: decodeInformation?.userId,
    }).populate("role");
    const isUserAllowed = userAllowed.includes(userInformation?.role?.role);
    console.log("USER:", userInformation);
console.log("ROLE:", userInformation.role);

    console.log(isUserAllowed);
    if (!isUserAllowed) {
      return res.json({
        messgae: "Unauthorised Acess",
      });
    }
    req.user = userInformation;
    next();
  };
};
