// models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: {
    type: String,
    enum: ['paciente', 'medico', 'empleado', 'administrador'],
    default: 'paciente'
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
