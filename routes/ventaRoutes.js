// routes/ventaRoutes.js
const express = require('express');
const VentaController = require('../controllers/ventaController');

const router = express.Router();

router.post('/crear', VentaController.createVenta);        // Crear una nueva venta
router.get('/todas', VentaController.getAllVentas);        // Obtener todas las ventas
router.get('/ventas/:id', VentaController.getVentaById);    // Obtener una venta por ID
router.delete('/ventas/:id', VentaController.deleteVenta);  // Eliminar una venta por ID

module.exports = router;
