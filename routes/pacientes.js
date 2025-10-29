//Importa Express para crear rutas
const express = require('express');
//Crea un enrutador
const router = express.Router();
//Importa el modelo Paciente
const Paciente = require('../models/Paciente');

//Ruta POST: Crea un Paciente
router.post('/', async (req, res) => {
    try {
        //Crea un nuevo Paciente con los datos del cuerpo
        const paciente = new Paciente(req.body);
        //Guarda en la base de datos
        await paciente.save();
        //Responde con el paciente creado
        res.status(201).json({ message: 'Paciente registrado exitosamente', paciente });
    } catch (error) {
        //Maneja errores
        res.status(400).json({ message: error.message });
    }
});

//Ruta GET: Obtener todos los pacientes
router.get('/', async (req, res) => {
    try {
        //Busca todos los pacientes
        const pacientes = await Paciente.find();
        //Responde con la lista
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta GET: Obtener un paciente por ID
router.get('/:id', async (req, res) => {
    try {
        //Busca por ID
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        //Responde con el Paciente
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta PUT:Actualizar un paciente
router.put('/:id', async (req, res) => {
    try {
        //Busca y actualiza
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
            new: true //Devuelve el documento actualizado
        });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        //Responde con el paciente actualizado
        res.json({ message: 'Paciente actualizado exitosamente', paciente });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Ruta DELETE: Eliminar un paciente
router.delete('/:id', async (req, res) => {
    try {
        //Busca y elimina
        const paciente = await Paciente.findByIdAndDelete(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado'});
        }
        //Responde con confirmacion
        res.json({ message: 'Paciente eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Exporta el enrutador
module.exports = router;