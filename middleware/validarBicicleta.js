// middleware/validarBicicleta.js
const validarBicicleta = (req, res, next) => {
    const { marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible } = req.body;
  
    if (!marca || !modelo || !tipo || !tamaño || !color || !precio || !material || !peso || !cambio || disponible === undefined) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
  
    next(); // Si todo es válido, sigue al siguiente middleware
  };
  
  module.exports = validarBicicleta;
  