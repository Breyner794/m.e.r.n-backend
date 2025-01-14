const mongoose = require('mongoose');   

const Vuelos = new mongoose.Schema({

    numero_vuelo:{
        type: String,
        required: [true, 'El numero de vuelo es obligatorio'],
        unique: true,
        trim: true,
    },
    origen:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aeropuerto',
        required: [true, 'El origen del vuelo es obligatorio'],
    },
    destino:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aeropuerto',
        required: [true, 'El destino del vuelo es obligatorio'],
    },
    fecha_y_hora_de_salida:{
        type: Date,
        required: [true, 'La fecha de salida es obligatoria'],
    },
    fecha_y_hora_de_llegada:{
        type: Date,
        required: [true, 'La fecha de llegada es obligatoria'],
    },
    estado_del_vuelo:{
        type: String,
        required: [true, 'El estado del vuelo es obligatorio'],
        enum: {
            values: ['En espera', 'En curso', 'Finalizado', 'Cancelado'],
            message: '{VALUE} no es un estado válido'
        },
    },
    id_avion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avion',
        required: [true, 'El avion es obligatorio'],
    },
}, {
    strict: true,
    timestamps: true // Añade createdAt y updatedAt
});


module.exports = mongoose.model('vuelos', Vuelos);