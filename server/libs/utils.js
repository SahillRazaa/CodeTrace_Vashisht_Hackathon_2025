const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SEC,
    { expiresIn: "7d" }
);

  return accessToken;
};

module.exports = { generateToken };