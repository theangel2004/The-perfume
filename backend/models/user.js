// Importamos la instancia de Sequelize configurada en /config/database.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definimos el modelo de Usuario para MySQL
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,     // Se genera automáticamente
    primaryKey: true,        // Es la clave primaria
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,        // No se permite valor nulo
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,            // No se repiten correos
    validate: {
      isEmail: true,         // Valida que sea formato email
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'users',        // Nombre de la tabla en MySQL
  timestamps: true,          // Crea columnas createdAt y updatedAt
});

// Exportamos el modelo
module.exports = User;
