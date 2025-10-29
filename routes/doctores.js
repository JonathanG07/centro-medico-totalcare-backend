//Importa Express para crear rutas
const express = require('express');
//Crea un enrutador
const router = express.Router();
//Importa el modelo doctor
const Doctor = require('../models/Doctor');

//Ruta POST: Crea un doctor
router.post('/register', async (req, res) => {
    try {
        //Crea un nuevo doctor con los datos del cuerpo
        const doctor = new Doctor(req.body);
        //Guarda en la base de datos
        await doctor.save();
        //Responde con el doctor creado
        res.status(201).json({ message: 'Doctor registrado exitosamente', doctor });
    } catch (error) {
        //Maneja errores
        res.status(400).json({ message: error.message });
    }
});

//Ruta GET: Obtener todos los doctor
router.get('/', async (req, res) => {
    try {
        //Busca todos los doctor
        const doctor = await Doctor.find();
        //Responde con la lista
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta GET: Obtener un doctor por ID
router.get('/:id', async (req, res) => {
    try {
        //Busca por ID
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        //Responde con el doctor
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta PUT:Actualizar un doctor
router.put('/:id', async (req, res) => {
    try {
        //Busca y actualiza
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true //Devuelve el documento actualizado
        });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        //Responde con el doctor actualizado
        res.json({ message: 'Doctor actualizado exitosamente', doctor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Ruta DELETE: Eliminar un doctor
router.delete('/:id', async (req, res) => {
    try {
        //Busca y elimina
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado'});
        }
        //Responde con confirmacion
        res.json({ message: 'Doctor eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Inicio de sesión doctor
router.post('/login', async (req, res)=> {
    const { email, password} = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor || doctor.password !==password) {
        return res.status(401).json({message: 'Credenciales invalidas'});
    }
    res.json({ message: 'Autenticacion satisfactoria'});
})

//Exporta el enrutador
module.exports = router;