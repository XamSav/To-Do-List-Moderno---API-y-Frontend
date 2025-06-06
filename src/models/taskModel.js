const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Definimos el path para la base de datos
const dbPath = path.join(__dirname, '../db/tasks.db');

// Crear y abrir la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Base de datos SQLite abierta correctamente.');
  }
});

// Crear la tabla si no existe
function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        estado TEXT DEFAULT 'pendiente'
      )
    `, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      } else {
        console.log('Tabla de tareas creada o ya existe.');
      }
    });
  });
}

// Exportamos el objeto db para usarlo en otros archivos
module.exports = { db, initDatabase };
