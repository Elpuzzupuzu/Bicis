// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bicicletas', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;
