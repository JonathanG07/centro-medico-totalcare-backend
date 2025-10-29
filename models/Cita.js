//Importa Mongoose para definir el esquema
const mongoose = require('mongoose');

//Define el esquema
const citaSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.ObjectId, //Tipo: 
        ref: "Doctor",
        required: true // Obligatorio
    },
    pacienteId: {
        type: mongoose.Schema.ObjectId, //Tipo: 
        ref: "Paciente", // Obligatorio
        required: true // Obligatorio
    },
    fecha: {
        type: Date, //Tipo: fecha
        required: true // Obligatorio
    },
    motivo: {
        type: String, 
        required: true 
    }
});

//Crea y exporta el modelo
module.exports = mongoose. model('Cita', citaSchema);