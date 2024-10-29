// repositories/bicicletaRepository.js
const Bicicleta = require('../models/bicicletaModel');

class BicicletaRepository {
  async findAll() {
    return await Bicicleta.findAll();
  }

  async findByModel(modelo) {
    return await Bicicleta.findOne({ where: { modelo } });
  }

  async findById(id) {
    return await Bicicleta.findByPk(id); // Método findByPk busca por primary key (ID)
  }

  async addBicicleta(bicicletaData) {
    return await Bicicleta.create(bicicletaData);
  }


    async updateBicicleta(id, datosBicicleta) {
    return await Bicicleta.update(datosBicicleta, { where: { id } });
  }




}// fin repository














module.exports = new BicicletaRepository();
