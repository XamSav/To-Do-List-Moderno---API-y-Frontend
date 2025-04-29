const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// CRUD de tareas
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
// Este archivo define las rutas para las operaciones CRUD de tareas.