To-Do List Moderno (API + Frontend)

Proyecto de gestión de tareas simple y moderno.
Incluye una API REST en Node.js con Express y SQLite, junto a una interfaz web sencilla para interactuar.

Tecnologías utilizadas
Node.js

Express.js

SQLite3

HTML, CSS, JavaScript (Frontend simple)

Funcionalidades
Crear, leer, actualizar y eliminar tareas (CRUD).

API RESTful.

Interfaz web para gestionar tareas.

Actualización en tiempo real usando AJAX.

Creación automática de la base de datos y tablas si no existen.

Instalación
Clonar el repositorio:

bash
Copiar
Editar
git clone https://github.com/XamSav/To-Do-List-Moderno---API-y-Frontend.git
Instalar las dependencias:

bash
Copiar
Editar
npm install
Ejecutar el servidor:

bash
Copiar
Editar
npm run dev
El servidor correrá en http://localhost:3000.

Estructura del Proyecto
pgsql
Copiar
Editar
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
Demo Online 🚀
🔗 Ver proyecto en Render

Notas
Si no existe el archivo tasks.db, se crea automáticamente al iniciar el servidor.

Proyecto ideal para mostrar habilidades en construcción de APIs, gestión de base de datos y conexión Backend ↔ Frontend.

