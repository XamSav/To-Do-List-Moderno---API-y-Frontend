# To-Do List Moderno (API + Frontend)

Proyecto de gestión de tareas simple y moderno.
Incluye una API REST en Node.js con Express y SQLite, junto a una interfaz web sencilla para interactuar.

# Tecnologías utilizadas
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

HTML, CSS, JavaScript (Frontend simple)

# Funcionalidades
Crear, leer, actualizar y eliminar tareas (CRUD).

API RESTful.

Interfaz web para gestionar tareas.

Actualización en tiempo real usando AJAX.

Creación automática de la base de datos y tablas si no existen.

# Instalación
Clonar el repositorio:
```bash
git clone https://github.com/XamSav/To-Do-List-Moderno---API-y-Frontend.git
```
Instalar las dependencias:
```bash
npm install
```

Ejecutar el servidor:
```bash
npm run dev
```
El servidor correrá en http://localhost:3000.

# Estructura del Proyecto 
```pgsql
src/
├── controllers/
│   └── taskController.js
├── models/
│   └── taskModel.js
├── public/
│   ├── index.html
│   └── styles/
│       └── style.css
├── db/
│   └── (se crea automáticamente)
└── app.js
```
# Demo Online 🚀

🔗 [Ver proyecto en Render](https://to-do-list-moderno-api-y-frontend.onrender.com)

Notas

Si no existe el archivo tasks.db, se crea automáticamente al iniciar el servidor.

Proyecto para mostrar habilidades en construcción de APIs, gestión de base de datos y conexión Backend ↔ Frontend.

