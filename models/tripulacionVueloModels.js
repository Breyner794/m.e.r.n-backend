const mongoose = require('mongoose');

const Tripulacion_de_vuelo = new mongoose.Schema({

    id_vuelo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vuelos',
        required: true,
    },
    id_empleado:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Empleado',
        required: true,
    },
    rol:{
        type: String,
        required: true,
        enum:[
            {
                values: ['Piloto', 'Copiloto', 'Ingeniero de Vuelo', 'Jefe de Cabina', 'Azafatas', 'Personal de Seguridad'],
                message: '{VALUE} No es un rol definido.'
            }
        ]
    },
},{
    strict:true,
    timestamps: true,
});

module.exports = mongoose.model('Tripulacion', Tripulacion_de_vuelo)