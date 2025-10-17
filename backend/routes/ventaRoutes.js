const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Registrar una venta
router.post('/registrar', ventaController.crearVenta);

// Obtener todas las ventas
router.get('/', ventaController.obtenerVentas);

module.exports = router;
