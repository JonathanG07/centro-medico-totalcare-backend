//Importa Express para crear rutas
const express = require('express');
//Crea un enrutador
const router = express.Router();
//Importa el modelo Cita
const Cita = require('../models/Cita');

//Ruta POST: Crea un Cita
router.post('/', async (req, res) => {
    try {
        //Crea un nuevo Cita con los datos del cuerpo
        const nuevaCita = new Cita(req.body);
        //Guarda en la base de datos
        await nuevaCita.save();
        //Responde con el cita creado
        res.status(201).json({ message: 'Cita registrada exitosamente', cita: nuevaCita });
    } catch (error) {
        //Maneja errores
        res.status(400).json({ message: 'Error al registrar la cita',error: error.message });
    }
});

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        citas = await Cita.find().populate('doctorId pacienteId');
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener citas', error: error.message });
    }
});

// 📊 Contar todas las citas registradas
router.get('/count', async (req, res) => {
  try {
    const total = await Cita.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error });
  }
});

//Exporta el enrutador
module.exports = router;
