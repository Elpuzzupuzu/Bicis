// services/ventaService.js
const VentaRepository = require('../repositories/ventaRepository');

class VentaService {

  async createVenta(ventaData) {
    // Calcular el total sumando los precios de los artículos
    let total = 0;
    for (const categoria in ventaData.articulos) {
      ventaData.articulos[categoria].forEach(articulo => {
        total += articulo.precio; // Sumar el precio de cada artículo
      });
    }

    // Agregar el total al objeto ventaData
    ventaData.total_compra = total;

    // Crear la venta en la base de datos
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
