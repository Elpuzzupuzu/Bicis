// repositories/bicicletaRepository.js
const bicicletasData = require('../data/bicicletas');

class BicicletaRepository {
  findAll() {
    return bicicletasData;
  }

  findByModel(modelo) {
    return bicicletasData.find(bicicleta => bicicleta.modelo === modelo);
  }

  // Método para agregar una bicicleta (simulación)
  addBicicleta(bicicleta) {
    bicicletasData.push(bicicleta);
    return bicicleta;
  }
}

module.exports = new BicicletaRepository();
