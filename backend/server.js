// ===============================
// 1️⃣ Importar dependencias
// ===============================
require('dotenv').config();              // Carga variables del archivo .env
const express = require('express');      // Framework para el servidor
const cors = require('cors');            // Permite peticiones desde el frontend
const userRoutes = require('./routes/userRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

// Conexión Sequelize (MySQL)
const sequelize = require('./config/database');

// ===============================
// 2️⃣ Configuración base del servidor
// ===============================
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// ===============================
// 3️⃣ Importar modelos (importante antes del sync)
// ===============================
require('./models/user');
require('./models/Perfume');
require('./models/Venta');

// ===============================
// 4️⃣ Conectar y sincronizar base de datos
// ===============================
sequelize.authenticate()
  .then(() => console.log('✅ Conectado correctamente a MySQL'))
  .catch(err => console.error('❌ Error al conectar a MySQL:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('📦 Tablas sincronizadas con MySQL'))
  .catch(err => console.error('❌ Error al sincronizar tablas:', err));

// ===============================
// 5️⃣ Rutas
// ===============================
app.use('/api/users', userRoutes);
app.use('/api/ventas', ventaRoutes);

app.get('/', (req, res) => res.send('API funcionando con MySQL'));

app.get('/perfumes', (req, res) => {
  res.json([
    { id: 1, nombre: "Valentino Uomo", precio: "100 USD" },
    { id: 2, nombre: "Born in Roma Donna", precio: "120 USD" },
    { id: 3, nombre: "YSL Libre", precio: "90 USD" }
  ]);
});

// ===============================
// 6️⃣ Iniciar el servidor
// ===============================
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
