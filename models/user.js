// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa la configuración de la base de datos

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // El email debe ser único
    validate: {
      isEmail: true  // Valida que sea un formato de email válido
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',  // Nombre de la tabla en la base de datos
  timestamps: true     // Añade createdAt y updatedAt automáticamente
});

module.exports = User;
