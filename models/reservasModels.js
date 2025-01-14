const mongoose = require('mongoose');

const Reservas = new mongoose.Schema({

    id_pasajero:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasajero',
        required: [true, 'El pasajero es obligatorio'],
    },
    id_vuelo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vuelos',
        required: [true, 'El vuelo es obligatorio'],
    },
    fecha_reserva:{
        type: Date,
        required: [true, 'El asiento es obligatorio'],
        trim: true, 
    },
    clase:{
        type: String,
        required: [true, 'El precio es obligatorio'],
        enum:{
            values: ["Economica", "Premium", "Empresarial"],  
            message: '{VALUE} no es una clase válida'
        }
    },
    estado_reserva:{
        type: String,
        required: [true, 'El estado es obligatorio'],
        enum: {
            values: ['Reservado', 'Comprado', 'Cancelado'],
            message: '{VALUE} no es un estado válido'
        },
    },
}, {
    strict: true,
    timestamps: true // Añade createdAt y updatedAt
});

module.exports = mongoose.model('reservas', Reservas);