const mongoose = require('mongoose');

const Aviones = new mongoose.Schema({
    codigo_avion: {
        type: String,
        required: [true, 'El código del avión es obligatorio'],
        unique: true,
        trim: true,
    },
    modelo: {
        type: String,
        required: [true, 'El modelo del avión es obligatorio']
    },
    capacidad: {
        type: Number,
        required: [true, 'La capacidad del avión es obligatoria'],
        min: [1, 'La capacidad debe ser mayor a 0']
    },
    year_fabricacion: {
        type: Date,
        required: [true, 'El año de fabricación es obligatorio'],
        validate: {
            validator: function(date) {
                return date <= new Date();
            },
            message: 'La fecha de fabricación no puede ser futura'
        }
    },
    estado_avion: {
        type: String,
        required: [true, 'El estado del avión es obligatorio'],
        enum: {
            values: ['activo', 'inactivo', 'mantenimiento', 'en_reparacion'],
            message: 'Estado no válido. Los estados permitidos son: activo, inactivo, mantenimiento, en_reparacion'
        },
        default: 'activo'
    }
}, {
    strict: true,
    timestamps: true // Añade createdAt y updatedAt
});

module.exports = mongoose.model('Avion', Aviones);