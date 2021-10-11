const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }

  try {
    const decodedData = jwt.verify(token, config.get("JWT_SECRET"));

    req.user = decodedData.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}