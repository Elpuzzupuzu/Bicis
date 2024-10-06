// app.js
const express = require('express');
const bicicletaController = require('./controllers/bicicletaController');
const sequelize = require('./config/database'); // Importamos la conexión
const validarBicicleta = require('./middleware/validarBicicleta'); // Middleware para validar bicicleta

const app = express();
const port = 3000;

// Middleware para registrar solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/bicicletas', async (req, res) => {
  try {
    const bicicletas = await bicicletaController.obtenerBicicletas(req, res);
    res.status(200).json(bicicletas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/bicicletas/:modelo', async (req, res) => {
  try {
    const bicicleta = await bicicletaController.obtenerBicicletaPorModelo(req, res);
    res.status(200).json(bicicleta);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post('/bicicletas', validarBicicleta, async (req, res) => {
  try {
    const bicicletaCreada = await bicicletaController.crearBicicleta(req, res);
    res.status(201).json(bicicletaCreada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Sincronizamos Sequelize con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
