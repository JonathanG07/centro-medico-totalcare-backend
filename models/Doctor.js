//Importa Mongoose para definir el esquema
const mongoose = require('mongoose');

//Define el esquema para el documento Doctor
const doctorSchema = new mongoose.Schema({
    nombre: {
        type: String, //Tipo: cadena de texto
        required: true // Obligatorio
    },
    apellido: {
        type: String, //Tipo: cadena de texto
        required: true // Obligatorio
    },
    email: {
        type: String, //Tipo: cadena de texto
        required: true, // Obligatorio
        unique:true //Evita emails duplicados
    },
    password: {
        type: String, //Tipo: cadena de texto
        required: true // Obligatorio
    },
    especialidad: {
        type: String, //Tipo: cadena de texto
        required: true // Obligatorio
    }
});

//Crea y exporta el modelo
module.exports = mongoose. model('Doctor', doctorSchema);