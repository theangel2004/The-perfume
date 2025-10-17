const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Perfume = require('./Perfume');

const Venta = sequelize.define('Venta', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
}, {
  timestamps: true,
});

// Relaciones
User.hasMany(Venta, { foreignKey: 'userId' });
Venta.belongsTo(User, { foreignKey: 'userId' });

Perfume.hasMany(Venta, { foreignKey: 'perfumeId' });
Venta.belongsTo(Perfume, { foreignKey: 'perfumeId' });

module.exports = Venta;
