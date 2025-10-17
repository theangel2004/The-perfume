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


// ✅ Obtener todos los usuarios (GET)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // SELECT * FROM users;
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// ✅ Obtener un usuario por ID (GET /api/users/:id)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id); // SELECT * FROM users WHERE id = ?

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// ✅ Editar usuario (PUT /api/users/:id)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Actualiza solo los campos que vengan en el body
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = password;

    await user.save();

    // No devolver la contraseña
    const userSafe = user.toJSON();
    delete userSafe.password;

    res.status(200).json({ message: 'Usuario actualizado', user: userSafe });
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// ✅ Eliminar usuario (DELETE /api/users/:id)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
