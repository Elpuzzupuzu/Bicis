// services/bicicletaService.js
const bicicletaRepository = require('../repositories/bicletaRepository');
const Bicicleta = require('../models/bicicletaModel');

class BicicletaService {
  async obtenerTodasLasBicicletas() {
    return await bicicletaRepository.findAll(); // Usa await para esperar la promesa
  }

  async obtenerBicicletaPorModelo(modelo) {
    const bicicleta = await bicicletaRepository.findByModel(modelo); // Usa await
    if (!bicicleta) {
      throw new Error('Bicicleta no encontrada');
    }
    return bicicleta;
  }

  async crearBicicleta(datosBicicleta) {
    const { marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible } = datosBicicleta;

    // Crea la nueva bicicleta con las propiedades adecuadas
    const nuevaBicicleta = {
      marca,
      modelo,
      tipo,
      tamaño,
      color,
      precio,
      material,
      peso,
      cambio,
      disponible
    };

    return await bicicletaRepository.addBicicleta(nuevaBicicleta); // Usa await
  }
}

module.exports = new BicicletaService();
