// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/config');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestión de autenticación de usuarios
 */
class AuthController {
  
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       201:
   *         description: Usuario creado
   *       400:
   *         description: El usuario ya existe
   *       500:
   *         description: Error al crear el usuario
   */
  async register(req, res) {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });

      res.status(201).json({ 
        message: 'Usuario creado', 
        user: { email: newUser.email } 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Iniciar sesión con un usuario
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       200:
   *         description: Inicio de sesión exitoso
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *             token:
   *               type: string
   *       404:
   *         description: Usuario no encontrado
   *       401:
   *         description: Contraseña incorrecta
   *       500:
   *         description: Error al iniciar sesión
   */
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30m' }); 
      res.status(200).json({ 
        message: 'Inicio de sesión exitoso', 
        token 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
  }
}

module.exports = new AuthController();
