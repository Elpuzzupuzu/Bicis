// services/ventaService.js
const VentaRepository = require('../repositories/ventaRepository');

class VentaService {
  async createVenta(ventaData) {
    return await VentaRepository.create(ventaData);
  }

  async getVentaById(id) {
    const venta = await VentaRepository.findById(id);
    if (!venta) {
      throw new Error('Venta no encontrada');
    }
    return venta;
  }

  async getAllVentas() {
    return await VentaRepository.findAll();
  }

  async deleteVenta(id) {
    const venta = await VentaRepository.findById(id);
    if (!venta) {
      throw new Error('Venta no encontrada');
    }
    await VentaRepository.delete(id);
    return { message: 'Venta eliminada correctamente' };
  }
}

module.exports = new VentaService();
