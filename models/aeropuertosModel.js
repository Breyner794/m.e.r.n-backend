const mongoose = require('mongoose');

const Aeropuerto = new mongoose.Schema({
  // _id se genera automáticamente por MongoDB
  Nombre: {
    type: String,
    required: true
  },
  Ciudad: {
    type: String,
    required: true
  },
  Pais: {
    type: String,
    required: true
  },
  Codigo_IATA: {
    type: String,
    required: true,
    unique: true,
    length: 3
  }
}, {
  // Esto mantiene los nombres de campos exactamente como los defines
  strict: true
});

module.exports = mongoose.model('Aeropuerto', Aeropuerto);