//Importa Express para crear rutas
const express = require('express');
//Crea un enrutador
const router = express.Router();
//Importa el modelo Empleado
const Empleado = require('../models/Empleado');

//Ruta POST: Crea un empleado
router.post('/', async (req, res) => {
    try {
        //Crea un nuevo empleado con los datos del cuerpo
        const empleado = new Empleado(req.body);
        //Guarda en la base de datos
        await empleado.save();
        //Responde con el empleado creado
        res.status(201).json({ message: 'Empleado registrado exitosamente', empleado });
    } catch (error) {
        //Maneja errores
        res.status(400).json({ message: error.message });
    }
});

//Ruta GET: Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
        //Busca todos los empleados
        const empleados = await Empleado.find();
        //Responde con la lista
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta GET: Obtener un empleado por ID
router.get('/:id', async (req, res) => {
    try {
        //Busca por ID
        const empleado = await Empleado.findById(req.params.id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        //Responde con el empleado
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta PUT:Actualizar un empleado
router.put('/:id', async (req, res) => {
    try {
        //Busca y actualiza
        const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, {
            new: true //Devuelve el documento actualizado
        });
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        //Responde con el empleado actualizado
        res.json({ message: 'Empleado actualizado exitosamente', empleado });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Ruta DELETE: Eliminar un empleado
router.delete('/:id', async (req, res) => {
    try {
        //Busca y elimina
        const empleado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado'});
        }
        //Responde con confirmacion
        res.json({ message: 'Empleado eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Exporta el enrutador
module.exports = router;