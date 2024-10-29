const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const bicicletaController = require('./controllers/bicicletaController');
const validarBicicleta = require('./middleware/validarBicicleta');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const ventaRoutes = require('./routes/ventaRoutes'); // Importa las rutas de venta
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// Configuración de CORS
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'https://elpuzzupuzu.github.io'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));

// Middleware para Morgan
app.use(morgan('dev'));
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Bicicletas',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar bicicletas',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./controllers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de bicicletas
app.get('/bicicletas', authMiddleware, (req, res) => bicicletaController.obtenerBicicletas(req, res));
app.get('/bicicletas/:modelo', authMiddleware, (req, res) => bicicletaController.obtenerBicicletaPorModelo(req, res));
app.get('/bicicletas/id/:id', authMiddleware, (req, res) => bicicletaController.obtenerBicicletaPorId(req, res));

// Aplica el middleware de validación
app.post('/bicicletas', validarBicicleta, (req, res) => bicicletaController.crearBicicleta(req, res));
app.put('/bicicletas/:id', (req, res) => bicicletaController.actualizarBicicleta(req, res));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de ventas
app.use('/ventas', ventaRoutes); // Agrega las rutas de ventas aquí

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
