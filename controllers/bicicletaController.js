// controllers/bicicletaController.js
const bicicletaService = require('../services/bicicletaService');

class BicicletaController {
  obtenerBicicletas(req, res) {
    try {
      const bicicletas = bicicletaService.obtenerTodasLasBicicletas();
      res.status(200).json(bicicletas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  obtenerBicicletaPorModelo(req, res) {
    const { modelo } = req.params;
    try {
      const bicicleta = bicicletaService.obtenerBicicletaPorModelo(modelo);
      res.status(200).json(bicicleta);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  crearBicicleta(req, res) {
    const nuevaBicicleta = req.body;
    try {
      const bicicletaCreada = bicicletaService.crearBicicleta(nuevaBicicleta);
      res.status(201).json(bicicletaCreada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new BicicletaController();
