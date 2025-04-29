const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/tasks.db');

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      estado TEXT DEFAULT 'pendiente'
    )
  `);
});

module.exports = db;
