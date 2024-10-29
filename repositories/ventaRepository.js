// repositories/ventaRepository.js
const Venta = require('../models/Venta');

class VentaRepository {
  async create(ventaData) {
    return await Venta.create(ventaData);
  }

  async findById(id) {
    return await Venta.findByPk(id);
  }

  async findAll() {
    return await Venta.findAll();
  }

  async delete(id) {
    return await Venta.destroy({ where: { id_venta: id } });
  }
}

module.exports = new VentaRepository();
