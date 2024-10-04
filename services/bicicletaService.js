// services/bicicletaService.js
const bicicletaRepository = require('../repositories/bicletaRepository');
const Bicicleta = require('../models/bicicletaModel');

class BicicletaService {
  obtenerTodasLasBicicletas() {
    return bicicletaRepository.findAll();
  }

  obtenerBicicletaPorModelo(modelo) {
    const bicicleta = bicicletaRepository.findByModel(modelo);
    if (!bicicleta) {
      throw new Error('Bicicleta no encontrada');
    }
    return bicicleta;
  }

  crearBicicleta(datosBicicleta) {
    const { marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible } = datosBicicleta;
    const nuevaBicicleta = new Bicicleta(marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible);
    return bicicletaRepository.addBicicleta(nuevaBicicleta);
  }
}

module.exports = new BicicletaService();
