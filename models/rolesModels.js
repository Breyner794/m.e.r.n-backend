const mongoose = require('mongoose');

const Roles = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio'],
        unique: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del rol es obligatoria']
    },
    permisos: {
        type: [String],
        required: [true, 'Los permisos del rol son obligatorios']
    }
}, {
    strict: true,
    timestamps: true // Añade createdAt y updatedAt

});

module.exports = mongoose.model('Rol', Roles);