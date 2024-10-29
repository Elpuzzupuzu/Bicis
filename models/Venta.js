// models/Venta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Importa el modelo de User

const Venta = sequelize.define('Venta', {
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user', // Hace referencia a la clave primaria en User
    },
    onDelete: 'CASCADE',
  },
  articulos: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  date_sell: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Ventas',
  timestamps: false,
});

// Define la relación correctamente
User.hasMany(Venta, { foreignKey: 'id_user' });
Venta.belongsTo(User, { foreignKey: 'id_user' });

module.exports = Venta;

