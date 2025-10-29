//Importa Mongoose para definir el esquema
const mongoose = require('mongoose');

//Define el esquema para el documento Paciente
const   pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String, //Tipo: cadena de texto
        required: true // Obligatorio
    },
    documento: {
        type: String, //Tipo: cadena de texto
        required: true, // Obligatorio
        unique:true //Evita emails duplicados
    },    
    email: {
        type: String, //Tipo: cadena de texto
        required: true, // Obligatorio
        unique:true //Evita emails duplicados
    }
});

//Crea y exporta el modelo
module.exports = mongoose. model('Paciente', pacienteSchema);