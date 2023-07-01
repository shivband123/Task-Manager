// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {authenticateToken}= require('../middleware/authMiddleware');

router.get('/', authenticateToken, taskController.getAllTasks);
router.get('/home',authenticateToken,taskController.getHome)
router.get('/create', authenticateToken, taskController.showCreateForm);
router.post('/', authenticateToken, taskController.createTask);
router.get('/:id', authenticateToken, taskController.getTaskById);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
