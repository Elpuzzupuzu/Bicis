// app.js
const express = require('express');
const bicicletaController = require('./controllers/bicicletaController');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());

// Rutas para manejar las bicicletas
app.get('/bicicletas', (req, res) => bicicletaController.obtenerBicicletas(req, res));

app.get('/bicicletas/:modelo', (req, res) => bicicletaController.obtenerBicicletaPorModelo(req, res));

app.post('/bicicletas', (req, res) => bicicletaController.crearBicicleta(req, res));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
