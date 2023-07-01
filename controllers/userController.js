// controllers/userController.js
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    // Check if the user with the specified email already exists
    const existingUser = await User.findOne({ email});
    if (existingUser) {
      return res.redirect("/auth/login")
    }

    // Create a new user with the specified role
    const user = new User({ name, email, password, role });

    // Save the user to the database
    await user.save();

    res.redirect('/auth/login');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.renderRegisterForm = (req, res) => {
  res.render('register');
};

exports.renderLoginForm = (req, res) => {
  res.render('login');
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if(user.role==='admin'){
      const token = generateToken({ user: { id: user._id } });
      res.cookie('token', token, { httpOnly: true });
      return res.redirect("/admin/")
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = generateToken({ user: { id: user._id } });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/tasks/home');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.render('/login',{ error: 'Access denied' });
  }
  try {
    const users = await User.find();
    res.render('adminDashboard',{users});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeUser = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const { userId } = req.params;
    await User.findByIdAndRemove(userId);
    
    // Fetch updated user list after removal
    const users = await User.find();
    
    // Render the adminDashboard view with updated user list
    res.render('adminDashboard', { users, message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
