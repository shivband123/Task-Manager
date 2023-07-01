// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
require("dotenv").config()

const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
//   const secretKey = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token is not valid.');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
