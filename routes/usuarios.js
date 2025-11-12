// routes/usuarios.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

// 🔐 REGISTRO DE USUARIO
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol, codigoSeguridad } = req.body;

    // Validaciones básicas
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // ⚙️ Validar código de seguridad si el rol no es paciente
    if (rol && rol !== 'paciente') {
      const CODIGO_SEGURIDAD = 'ADMIN2025'; // 👉 cámbialo o guárdalo en .env
      if (codigoSeguridad !== CODIGO_SEGURIDAD) {
        return res.status(403).json({ message: 'Código de seguridad inválido o faltante.' });
      }
    }

    // Verificar si ya existe el usuario
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      rol: rol || 'paciente' // por defecto paciente
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔑 INICIO DE SESIÓN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      'secreto_medico', // ⚠️ En producción usa variable de entorno
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📊 Contar todos los usuarios
router.get('/count', async (req, res) => {
  try {
    const total = await Usuario.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// 📊 Contar médicos
router.get('/count/medicos', async (req, res) => {
  try {
    const total = await Usuario.countDocuments({ rol: 'medico' });
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener médicos', error });
  }
});

// 📊 Contar pacientes
router.get('/count/pacientes', async (req, res) => {
  try {
    const total = await Usuario.countDocuments({ rol: 'paciente' });
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pacientes', error });
  }
});

module.exports = router;
