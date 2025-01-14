const mongoose = require('mongoose');

const Pasajero = new mongoose.Schema({
    codigo_pasajero: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"],
    },
    nacionalidad: {
        type: String,
        required: true
    },
    pasaporte: {
        type: String,
        required: true,
        unique: true,
    },
    fecha_expiracion: {
        type: Date,
        required: [true, "La fecha de expiración del pasaporte es obligatoria"],
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    genero: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: {
            values: ['adulto', 'niño', 'bebé', 'VIP', 'frecuente'],
            message: '{VALUE} no es un tipo válido'
        }
    },
    estado: {
        type: String,
        required: true
    },
}, {
    strict: true,
    timestamps: true // Añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Pasajero', Pasajero);