//Importa Express para crear rutas
const express = require('express');
//Crea un enrutador
const router = express.Router();
//Importa el modelo doctor
const Doctor = require('../models/Doctor');
//Importa el modelo Usuario (registro global)
const Usuario = require('../models/Usuario');
//Importa bcrypt para encriptar contraseñas
const bcrypt = require('bcryptjs');

//Ruta POST: Crea un doctor (y también lo registra en usuarios)
router.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, email, password, especialidad } = req.body;

        // Verificar si el correo ya existe en usuarios
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado como usuario' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo doctor
        const nuevoDoctor = new Doctor({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            especialidad
        });
        await nuevoDoctor.save();

        // Crear registro global en "usuarios"
        const nuevoUsuario = new Usuario({
            nombre: `${nombre} ${apellido}`,
            email,
            rol: 'doctor'
        });
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Doctor registrado exitosamente', doctor: nuevoDoctor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Ruta GET: Obtener todos los doctores
router.get('/', async (req, res) => {
    try {
        const doctor = await Doctor.find();
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta GET: Obtener un doctor por ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta PUT: Actualizar un doctor
router.put('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        res.json({ message: 'Doctor actualizado exitosamente', doctor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Ruta DELETE: Eliminar un doctor
router.delete('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }

        // Eliminar también el registro en usuarios
        await Usuario.findOneAndDelete({ email: doctor.email });

        res.json({ message: 'Doctor eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Inicio de sesión doctor
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(401).json({ message: 'Correo no encontrado' });
        }

        // Comparar contraseñas encriptadas
        const passwordValido = await bcrypt.compare(password, doctor.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Autenticación satisfactoria', doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Exporta el enrutador
module.exports = router;
