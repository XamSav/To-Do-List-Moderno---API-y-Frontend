const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
app.use(express.static(path.join(__dirname, 'public')));
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Rutas de tareas
app.use('/api/tasks', taskRoutes);
const dbDir = path.join(__dirname, './db');

if (!fs.existsSync(dbDir)) {
  console.log('Warning: El directorio de la base de datos no existe.');
  try{
    console.log('Try: Creando ruta ./db.');
    fs.mkdirSync(dbDir , { recursive: true });
    console.log('Ruta ./db creada.');
    
  }catch (err) {
    process.exit(1); // Salir de la app para evitar problemas posteriores
  }
}

const { connectToDatabase } = require('./models/taskModel');
const db = connectToDatabase();


// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API de Gestión de Tareas</title>
      </head>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1>Bienvenido a la API de Gestión de Tareas 🚀</h1>
        <p>Utiliza <strong>/api/tasks</strong> para interactuar con las tareas.</p>
        <p>O ve a <strong><a href="./web/tasks">/web/tasks</a></strong> para interactuar con las tareas desde el navegador.</p>
      </body>
    </html>
  `);
});
// Web UI para tareas
app.get('/web/tasks', (req, res, next) => {
  const filePath = path.join(__dirname, 'views', 'tasks.html');
  
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) return next(err);

    // Buscar tareas en la base de datos
    db.all('SELECT * FROM tasks', (err, rows) => {
      if (err) return next(err);

      // Generar los <li> dinámicos
      const taskList = rows.map(task => `
        <li id="task-${task.id}">
          <div>
            <strong>${task.titulo}</strong> - ${task.descripcion}
          </div>
          <div class="state-buttons">
            <button onclick="updateTaskState(${task.id}, 'pendiente')" class="${task.estado === 'pendiente' ? 'active' : ''}">Pendiente</button>
            <button onclick="updateTaskState(${task.id}, 'en progreso')" class="${task.estado === 'en progreso' ? 'active' : ''}">En Progreso</button>
            <button onclick="updateTaskState(${task.id}, 'completada')" class="${task.estado === 'completada' ? 'active' : ''}">Completada</button>
          </div>
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </li>
      `).join('');
      
      
      

      // Reemplazar en el HTML
      const finalHtml = html.replace('<!-- Aquí insertaremos tareas dinámicamente -->', taskList);

      res.send(finalHtml);
    });
  });
});

app.post('/web/tasks', (req, res, next) => {
  const { titulo, descripcion, estado } = req.body;
  const db = require('./models/taskModel');

  const query = `INSERT INTO tasks (titulo, descripcion, estado) VALUES (?, ?, ?)`;
  db.run(query, [titulo, descripcion, estado || 'pendiente'], function (err) {
    if (err) return next(err);
    res.redirect('/web/tasks');
  });
});
// Borrar tarea desde web
app.post('/web/tasks/:id/delete', (req, res, next) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM tasks WHERE id = ?`;
  db.run(deleteQuery, [id], function (err) {
    if (err) return next(err);

    res.redirect('/web/tasks');
  });
});



// Middleware de manejo de errores
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

