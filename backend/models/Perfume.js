const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Perfume = sequelize.define('Perfume', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'perfumes',
  timestamps: true
});

module.exports = Perfume;

