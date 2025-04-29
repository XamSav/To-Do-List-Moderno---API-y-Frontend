// Middleware de manejo de errores
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log para debug interno
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
  
    res.status(statusCode).json({ message });
  }
  
  module.exports = errorHandler;
  