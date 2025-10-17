// controllers/userController.js
const User = require('../models/user');

// Registrar usuario
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe (Sequelize usa "where")
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Crear nuevo usuario
    const newUser = await User.create({ username, email, password });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: newUser,
    });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Login usuario
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    // Buscar usuario en MySQL
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user,
    });
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
