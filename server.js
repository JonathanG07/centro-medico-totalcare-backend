//Importa dependencias
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Rutas
const empleadoRoutes = require('./routes/empleados');
const doctorRoutes = require('./routes/doctores');
const pacienteRoutes = require('./routes/pacientes');
const citaRoutes = require('./routes/citas');
const historialRoutes = require('./routes/historial');
const usuarioRoutes = require('./routes/usuarios');

//Carga variables de entorno
dotenv.config();

//Crea la aplicación Express
const app = express();

//Conecta a MongoDB
connectDB();

//Configura middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//Define rutas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/doctores', doctorRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/usuarios', usuarioRoutes);

//Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Gestión de Centro Médico funcionando');
});

// --- Crear primer usuario administrador (solo una vez) ---
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario');

(async () => {
  try {
    const adminExistente = await Usuario.findOne({ email: 'admin@totalcare.com' });
    if (!adminExistente) {
      const hashedPassword = await bcrypt.hash('Admin1234', 10);
      await Usuario.create({
        nombre: 'Administrador Principal',
        email: 'admin@totalcare.com',
        password: hashedPassword,
        rol: 'administrador'
      });
      console.log('✅ Administrador principal creado exitosamente');
    } else {
      console.log('ℹ️ El administrador ya existe');
    }
  } catch (error) {
    console.error('❌ Error al crear el administrador:', error.message);
  }
})();

// configuracion del PUERTO
const PORT = process.env.PORT || 3000;
//Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
