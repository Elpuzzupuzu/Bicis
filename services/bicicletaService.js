// services/bicicletaService.js
const bicicletaRepository = require('../repositories/bicletaRepository');

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

  obtenerBicicletaPorId(id) {
    const bicicleta = bicicletaRepository.findById(id);
    if (!bicicleta) {
      throw new Error('Bicicleta no encontrada');
    }
    return bicicleta;
  }

  crearBicicleta(datosBicicleta) {
    const { marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible } = datosBicicleta;
    const nuevaBicicleta = { marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible };
    return bicicletaRepository.addBicicleta(nuevaBicicleta);
  }


  async actualizarBicicleta(id, datosActualizados) {
    const bicicleta = await bicicletaRepository.findById(id);
    if (!bicicleta) {
      throw new Error('Bicicleta no encontrada');
    }
    return await bicicletaRepository.updateBicicleta(id, datosActualizados);
  }


}


  










module.exports = new BicicletaService();
