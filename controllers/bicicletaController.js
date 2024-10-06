// controllers/bicicletaController.js
const bicicletaService = require('../services/bicicletaService');

class BicicletaController {
  async obtenerBicicletas(req, res) {
    try {
      const bicicletas = await bicicletaService.obtenerTodasLasBicicletas();
      return bicicletas;
    } catch (error) {
      throw new Error(error.message); // Lanza el error para manejarlo en app.js
    }
  }

  async obtenerBicicletaPorModelo(req, res) {
    const { modelo } = req.params;
    try {
      const bicicleta = await bicicletaService.obtenerBicicletaPorModelo(modelo);
      return bicicleta;
    } catch (error) {
      throw new Error(error.message); // Lanza el error para manejarlo en app.js
    }
  }

  async crearBicicleta(req, res) {
    const nuevaBicicleta = req.body;
    try {
      const bicicletaCreada = await bicicletaService.crearBicicleta(nuevaBicicleta);
      return bicicletaCreada;
    } catch (error) {
      throw new Error(error.message); // Lanza el error para manejarlo en app.js
    }
  }
}

module.exports = new BicicletaController();
