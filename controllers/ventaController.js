// controllers/ventaController.js
const VentaService = require('../services/ventaService');

class VentaController {
  async createVenta(req, res) {
    try {
      const ventaData = req.body;
      const venta = await VentaService.createVenta(ventaData);
      res.status(201).json(venta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVentaById(req, res) {
    try {
      const id = req.params.id;
      const venta = await VentaService.getVentaById(id);
      res.status(200).json(venta);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllVentas(req, res) {
    try {
      const ventas = await VentaService.getAllVentas();
      console.log(ventas); // Agrega esto para ver la respuesta
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  

  async deleteVenta(req, res) {
    try {
      const id = req.params.id;
      const result = await VentaService.deleteVenta(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new VentaController();
