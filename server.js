//Imposta dependencias
const express = require('express'); //Framework para el servidor
const cors = require('cors'); //Permite solicitudes desde el frontend
const dotenv = require('dotenv'); //Carga variables de entorno
const connectDB = require('./config/db'); //Conexcion a MongoDB

//Rutas
const empleadoRoutes = require('./routes/empleados'); //Rutas de empleados
const doctorRoutes = require('./routes/doctores');
const pacienteRoutes = require('./routes/pacientes');
const citaRoutes = require('./routes/citas');
const historialRoutes = require('./routes/historial');
const usuarioRoutes = require('./routes/usuarios');

//Carga variables de entorno
dotenv.config();

//Crea la aplicacion Express
const app = express();

//Conecta a MongoDB
connectDB();

//Configura middlewares
app.use(cors({
  origin: '*', // permite todas las conexiones (para pruebas)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));//Habilita CORS
app.use(express.json()); //Parsea cuerpos JSON

//Define rutas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/doctores', doctorRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/usuarios', usuarioRoutes);

//Ruta raiz para verificar el servidor
app.get('/', (req, res) => {
    res.send('API de Gestión de Centro Medico funcionando');
});

//Configura el puerto
const PORT = process.env.PORT || 3000;

// --- Crear primer usuario administrador (solo una vez) ---

const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

router.get('/crear-admin', async (req, res) => {
  try {
    const existente = await Usuario.findOne({ email: 'admin@totalcare.com' });
    if (existente) return res.json({ mensaje: 'El admin ya existe' });

    const password = await bcrypt.hash('Admin1234', 10);
    const nuevoAdmin = await Usuario.create({
      nombre: 'Administrador Principal',
      email: 'admin@totalcare.com',
      password,
      rol: 'administrador'
    });

    res.json({ mensaje: 'Administrador creado', admin: nuevoAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
