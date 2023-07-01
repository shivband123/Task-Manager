// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateToken,isAdmin} = require('../middleware/authMiddleware');

router.get('/admin/', authenticateToken, isAdmin, userController.getAllUsers);
router.delete('/admin/:userId', authenticateToken, isAdmin, userController.removeUser);

router.get('/register', userController.renderRegisterForm);
router.post('/register', userController.registerUser);

router.get('/login', userController.renderLoginForm);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logout);

module.exports = router;
