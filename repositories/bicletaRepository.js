// repositories/bicicletaRepository.js
const Bicicleta = require('../models/bicicletaModel');

class BicicletaRepository {
  async findAll() {
    return await Bicicleta.findAll();
  }

  async findByModel(modelo) {
    return await Bicicleta.findOne({ where: { modelo } });
  }

  async addBicicleta(bicicletaData) {
    return await Bicicleta.create(bicicletaData);
  }
}

module.exports = new BicicletaRepository();
