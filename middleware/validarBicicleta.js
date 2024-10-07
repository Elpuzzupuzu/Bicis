const validarBicicleta = (req, res, next) => {
  const { marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible } = req.body;

  // Verifica si algún campo requerido es nulo o no está presente
  if (![marca, modelo, tipo, tamaño, color, precio, material, peso, cambio].every(field => field !== undefined && field !== null) || disponible === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios y no pueden ser nulos.' });
  }

  next(); // Si todo es válido, sigue al siguiente middleware
};

module.exports = validarBicicleta;
