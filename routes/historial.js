// //Importa Express para crear rutas
// const express = require('express');
// //Crea un enrutador
// const router = express.Router();
// //Importa el modelo Cita
// const Cita = require('../models/Cita');


// //Ruta GET: Obtener historial medico por paciente
// router.get('/:pacienteId', async (req, res) => {
//     try {
//         //Busca todos los Citas
//         const historial = await Cita.find({ pacienteId: req.params.pacienteId}).populate('doctorId pacienteId');
//         //Responde con la lista
//         res.json(historial);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });



// //Exporta el enrutador
// module.exports = router;
//Importa Express para crear rutas

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Importa el modelo Cita
const Cita = require('../models/Cita');

//Ruta GET: Obtener historial médico por paciente
router.get('/:pacienteId', async (req, res) => {
    try {
        const { pacienteId } = req.params;

        // Validar formato del ID
        if (!mongoose.Types.ObjectId.isValid(pacienteId)) {
            return res.status(400).json({ message: 'ID de paciente inválido' });
        }

        // Buscar citas asociadas
        const historial = await Cita.find({ pacienteId })
            .populate('doctorId pacienteId');

        if (historial.length === 0) {
            return res.json([]); // El frontend mostrará "No hay registros"
        }

        res.json(historial);

    } catch (error) {
        console.error('Error al obtener el historial:', error.message);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

//Exporta el enrutador
module.exports = router;
