//Importa Mongoose para definir el esquema
const mongoose = require('mongoose');

//Define el esquema para el documento Empleado
const empleadoSchema = new mongoose.Schema({
    nombre: {
        type: String, //Tipo: cadena de texto
        required: true // Obligatorio
    },
    email: {
        type: String, //Tipo: cadena de texto
        required: true, // Obligatorio
        unique:true //Evita emails duplicados
    },
    cargo: {
        type: String, //Tipo: cadena de texto
        required: true // Obligatorio
    },
    salario: {
        type: Number, 
        required: true 
    }
});

//Crea y exporta el modelo
module.exports = mongoose. model('Empleado', empleadoSchema);