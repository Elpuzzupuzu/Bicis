// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta de registro
router.post('/register', authController.register);

// Ruta de inicio de sesión
router.post('/login', authController.login);

// Ruta protegida (ejemplo)
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Perfil de usuario', userId: req.userId });
});

module.exports = router;
