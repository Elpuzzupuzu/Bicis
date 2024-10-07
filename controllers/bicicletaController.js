// controllers/bicicletaController.js
const bicicletaService = require('../services/bicicletaService');

class BicicletaController {
  async obtenerBicicletas(req, res) {
    try {
      const bicicletas = await bicicletaService.obtenerTodasLasBicicletas();
      res.status(200).json(bicicletas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async obtenerBicicletaPorModelo(req, res) {
    const { modelo } = req.params;
    try {
      const bicicleta = await bicicletaService.obtenerBicicletaPorModelo(modelo);
      if (bicicleta) {
        res.status(200).json(bicicleta);
      } else {
        res.status(404).json({ message: 'Bicicleta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // NUEVO: Obtener bicicleta por ID
  async obtenerBicicletaPorId(req, res) {
    const { id } = req.params;
    try {
      const bicicleta = await bicicletaService.obtenerBicicletaPorId(id);
      if (bicicleta) {
        res.status(200).json(bicicleta);
      } else {
        res.status(404).json({ message: 'Bicicleta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async crearBicicleta(req, res) {
    const nuevaBicicleta = req.body;
    try {
      const bicicletaCreada = await bicicletaService.crearBicicleta(nuevaBicicleta);
      res.status(201).json(bicicletaCreada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  async actualizarBicicleta(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;
    try {
      const bicicletaActualizada = await bicicletaService.actualizarBicicleta(id, datosActualizados);
      res.status(200).json({ message: 'Bicicleta actualizada', bicicletaActualizada });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }







}

module.exports = new BicicletaController();
