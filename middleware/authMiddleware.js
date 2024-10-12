const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del formato "Bearer token"

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o caducado' });
    }
    
    // Almacenar la información del usuario en la solicitud para su uso posterior
    req.userId = decoded.userId;
    next(); // Continuar al siguiente middleware o ruta
  });
};

module.exports = authMiddleware;
