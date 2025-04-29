// taskController.js
const { db } = require('../models/taskModel');

// Obtener todas las tareas
exports.getAllTasks = (req, res, next) => {
  try {
    const query = `SELECT * FROM tasks`;
    db.all(query, [], (err, rows) => {
      if (err) return next(err);

      res.json(rows);
    });
  } catch (error) {
    next(error);
  }
};

// Obtener una tarea por ID
exports.getTaskById = (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM tasks WHERE id = ?`;

    db.get(query, [id], (err, row) => {
      if (err) return next(err);

      if (!row) {
        const error = new Error('Tarea no encontrada.');
        error.statusCode = 404;
        throw error;
      }

      res.json(row);
    });
  } catch (error) {
    next(error);
  }
};

// Crear una nueva tarea
exports.createTask = (req, res, next) => {
  try {
    const { titulo, descripcion, estado } = req.body;

    if (!titulo || titulo.trim() === '') {
      const error = new Error('El título es obligatorio.');
      error.statusCode = 400;
      throw error;
    }

    const query = `INSERT INTO tasks (titulo, descripcion, estado) VALUES (?, ?, ?)`;
    db.run(query, [titulo.trim(), descripcion || '', estado || 'pendiente'], function (err) {
      if (err) return next(err);

      res.status(201).json({
        id: this.lastID,
        titulo: titulo.trim(),
        descripcion: descripcion || '',
        estado: estado || 'pendiente',
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = (req, res, next) => {
    console.log('Body recibido:', req.body);
  
    const { id } = req.params;
    const { estado } = req.body;
  
    const updateQuery = `UPDATE tasks SET estado = ? WHERE id = ?`;
    db.run(updateQuery, [estado, id], function (err) {
      if (err) return next(err);
  
      res.status(200).json({ message: 'Estado de tarea actualizado correctamente.' });
    });
  };
  
  
  

// Eliminar una tarea
exports.deleteTask = (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteQuery = `DELETE FROM tasks WHERE id = ?`;
    db.run(deleteQuery, [id], function (err) {
      if (err) return next(err);

      if (this.changes === 0) {
        const error = new Error('Tarea no encontrada.');
        error.statusCode = 404;
        return next(error);
      }

      res.status(200).json({ message: 'Tarea eliminada correctamente.' });
    });
  } catch (error) {
    next(error);
  }
};
