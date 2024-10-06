// controllers/bicicletaController.js
const bicicletaService = require('../services/bicicletaService');

class BicicletaController {
  // Obtener todas las bicicletas
  async obtenerBicicletas(req, res) {
    try {
      const bicicletas = await bicicletaService.obtenerTodasLasBicicletas();
      res.status(200).json(bicicletas); // Envía la respuesta con código 200 y los datos
    } catch (error) {
      res.status(500).json({ message: error.message }); // Manejo de errores
    }
  }

  // Obtener bicicleta por modelo
  async obtenerBicicletaPorModelo(req, res) {
    const { modelo } = req.params;
    try {
      const bicicleta = await bicicletaService.obtenerBicicletaPorModelo(modelo);
      if (bicicleta) {
        res.status(200).json(bicicleta); // Envía la respuesta con código 200 y los datos
      } else {
        res.status(404).json({ message: 'Bicicleta no encontrada' }); // Manejo de "no encontrado"
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Manejo de errores
    }
  }

  // Crear una nueva bicicleta
  async crearBicicleta(req, res) {
    const nuevaBicicleta = req.body;
    try {
      const bicicletaCreada = await bicicletaService.crearBicicleta(nuevaBicicleta);
      res.status(201).json(bicicletaCreada); // Envía la respuesta con código 201 (creado) y los datos
    } catch (error) {
      res.status(400).json({ message: error.message }); // Manejo de errores
    }
  }
}

module.exports = new BicicletaController();
