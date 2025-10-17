const Venta = require('../models/Venta');
const User = require('../models/user');
const Perfume = require('../models/Perfume');

// Registrar una venta
exports.crearVenta = async (req, res) => {
  try {
    const { userId, perfumeId, cantidad } = req.body;

    // Validación
    if (!userId || !perfumeId || !cantidad) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios (userId, perfumeId, cantidad)' });
    }

    // Verificar existencia del usuario y perfume
    const usuario = await User.findByPk(userId);
    const perfume = await Perfume.findByPk(perfumeId);

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    if (!perfume) return res.status(404).json({ message: 'Perfume no encontrado' });

    // Calcular total automáticamente
    const total = perfume.precio * cantidad;

    // Crear la venta
    const nuevaVenta = await Venta.create({
      userId,
      perfumeId,
      cantidad,
      total
    });

    res.status(201).json({
      message: '✅ Venta registrada con éxito',
      venta: nuevaVenta
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener todas las ventas con detalles
exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        { model: User, attributes: ['username', 'email'] },
        { model: Perfume, attributes: ['nombre', 'marca', 'precio'] }
      ]
    });

    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas', error: error.message });
  }
};
