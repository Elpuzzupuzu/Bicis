// controllers/bicicletaController.js
const bicicletaService = require('../services/bicicletaService');

/**
 * @swagger
 * tags:
 *   name: Bicicletas
 *   description: Gestión de bicicletas
 */
class BicicletaController {
  
  /**
   * @swagger
   * /bicicletas:
   *   get:
   *     summary: Obtener todas las bicicletas
   *     tags: [Bicicletas]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de bicicletas
   *       500:
   *         description: Error en el servidor
   */
  async obtenerBicicletas(req, res) {
    try {
      const bicicletas = await bicicletaService.obtenerTodasLasBicicletas();
      res.status(200).json(bicicletas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @swagger
   * /bicicletas/{modelo}:
   *   get:
   *     summary: Obtener una bicicleta por modelo
   *     tags: [Bicicletas]
   *     parameters:
   *       - name: modelo
   *         in: path
   *         required: true
   *         description: Modelo de la bicicleta a buscar
   *         schema:
   *           type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Bicicleta encontrada
   *       404:
   *         description: Bicicleta no encontrada
   *       500:
   *         description: Error en el servidor
   */
  async obtenerBicicletaPorModelo(req, res) {
    const { modelo } = req.params;
    try {
      const bicicleta = await bicicletaService.obtenerBicicletaPorModelo(modelo);
      if (bicicleta) {
        res.status(200).json(bicicleta);
      } else {
        res.status(404).json({ message: 'Bicicleta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @swagger
   * /bicicletas/id/{id}:
   *   get:
   *     summary: Obtener una bicicleta por ID
   *     tags: [Bicicletas]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID de la bicicleta a buscar
   *         schema:
   *           type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Bicicleta encontrada
   *       404:
   *         description: Bicicleta no encontrada
   *       500:
   *         description: Error en el servidor
   */
  async obtenerBicicletaPorId(req, res) {
    const { id } = req.params;
    try {
      const bicicleta = await bicicletaService.obtenerBicicletaPorId(id);
      if (bicicleta) {
        res.status(200).json(bicicleta);
      } else {
        res.status(404).json({ message: 'Bicicleta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @swagger
   * /bicicletas:
   *   post:
   *     summary: Crear una nueva bicicleta
   *     tags: [Bicicletas]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               modelo:
   *                 type: string
   *               marca:
   *                 type: string
   *               precio:
   *                 type: number
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       201:
   *         description: Bicicleta creada
   *       400:
   *         description: Error en la creación de la bicicleta
   */
  async crearBicicleta(req, res) {
    const nuevaBicicleta = req.body;
    try {
      const bicicletaCreada = await bicicletaService.crearBicicleta(nuevaBicicleta);
      res.status(201).json(bicicletaCreada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * @swagger
   * /bicicletas/{id}:
   *   put:
   *     summary: Actualizar una bicicleta por ID
   *     tags: [Bicicletas]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID de la bicicleta a actualizar
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               modelo:
   *                 type: string
   *               marca:
   *                 type: string
   *               precio:
   *                 type: number
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Bicicleta actualizada
   *       400:
   *         description: Error en la actualización de la bicicleta
   */
  async actualizarBicicleta(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;
    try {
      const bicicletaActualizada = await bicicletaService.actualizarBicicleta(id, datosActualizados);
      res.status(200).json({ message: 'Bicicleta actualizada', bicicletaActualizada });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new BicicletaController();
