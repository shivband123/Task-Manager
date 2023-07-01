// authMiddleware.js
require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateToken=async  (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'No token provided, authorization denied.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // Attach the user object to the request
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Check if user is authenticated and has admin role
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};
