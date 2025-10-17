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

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

// Exportamos el enrutador para que server.js lo use
module.exports = router;
