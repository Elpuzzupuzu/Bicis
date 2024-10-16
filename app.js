const express = require('express');
const morgan = require('morgan'); // Importar Morgan
const cors = require('cors'); // Importar CORS

const bicicletaController = require('./controllers/bicicletaController');
const validarBicicleta = require('./middleware/validarBicicleta'); // Importa el middleware
const sequelize = require('./config/database'); // Importamos la conexión
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// habilita cors
const allowedOrigins = [
  'http://127.0.0.1:5500', // Permitir solicitudes desde tu frontend local
  'https://elpuzzupuzu.github.io' // Permitir solicitudes desde tu dominio GitHub Pages
];

app.use(cors({
  origin: allowedOrigins, // Permitir solicitudes desde los orígenes especificados
  methods: ['GET', 'POST', 'PUT'], // Métodos que deseas permitir (agregué PUT aquí ya que lo usas)
  credentials: true // Permitir cookies (si es necesario)
}));

// Middleware para Morgan: registro de solicitudes HTTP
app.use(morgan('dev')); // Modo 'dev' muestra logs concisos de las solicitudes

// Middleware para parsear JSON
app.use(express.json());

// Rutas de bicicletas
app.get('/bicicletas', authMiddleware, (req, res) => bicicletaController.obtenerBicicletas(req, res));
app.get('/bicicletas/:modelo', authMiddleware, (req, res) => bicicletaController.obtenerBicicletaPorModelo(req, res));
app.get('/bicicletas/id/:id', authMiddleware, (req, res) => bicicletaController.obtenerBicicletaPorId(req, res));

// Aplica el middleware de validación aquí
app.post('/bicicletas', validarBicicleta, (req, res) => bicicletaController.crearBicicleta(req, res));

app.put('/bicicletas/:id', (req, res) => bicicletaController.actualizarBicicleta(req, res));

// Rutas de autenticación
app.use('/auth', authRoutes); // Aquí se registran las rutas de autenticación

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
