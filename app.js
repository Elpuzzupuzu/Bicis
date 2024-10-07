const express = require('express');
const morgan = require('morgan'); // Importar Morgan
const bicicletaController = require('./controllers/bicicletaController');
const sequelize = require('./config/database'); // Importamos la conexión

const app = express();
const port = 3000;

// Middleware para Morgan: registro de solicitudes HTTP
app.use(morgan('dev')); // Modo 'dev' muestra logs concisos de las solicitudes

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/bicicletas', (req, res) => bicicletaController.obtenerBicicletas(req, res));
app.get('/bicicletas/:modelo', (req, res) => bicicletaController.obtenerBicicletaPorModelo(req, res));
app.get('/bicicletas/id/:id', (req, res) => bicicletaController.obtenerBicicletaPorId(req, res)); // NUEVA RUTA POR ID

app.post('/bicicletas', (req, res) => bicicletaController.crearBicicleta(req, res));

app.put('/bicicletas/:id', (req, res) => bicicletaController.actualizarBicicleta(req, res));


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
