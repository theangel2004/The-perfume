require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 



const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
const mongoURL = process.env.MONGO_URI || "mongodb://mongo:27017/perfumeDB";
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas
app.use('/api/users', userRoutes);

// Endpoint de prueba
app.get('/', (req, res) => res.send('API lista para ser usada por el backend'));
app.get('/perfumes', (req, res) => {
    res.json([
        { id: 1, nombre: "Valentino Uomo", precio: "100 USD" },
        { id: 2, nombre: "Born in Roma Donna", precio: "120 USD" },
        { id: 3, nombre: "YSL Libre", precio: "90 USD" }
    ]);
});

app.listen(port, () => console.log(`API lista en http://localhost:${port}`));
