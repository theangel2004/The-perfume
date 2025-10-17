// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 🧩 Ruta para registrar un nuevo usuario
// Endpoint: POST /api/users/register
router.post('/register', userController.registerUser);

// 🔐 Ruta para iniciar sesión
// Endpoint: POST /api/users/login
router.post('/login', userController.loginUser);

// Exportamos el enrutador para que server.js lo use
module.exports = router;
