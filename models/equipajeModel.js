const mongoose = require('mongoose');

const Equipajes = new mongoose.Schema ({

 id_reserva: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservas',
    required: [true, 'La reserva es necesaria.']
 },
 peso:{
    type: Number,
    required: [true, 'El peso es necesario'],
 },
 tipo:{
    type: String,
    required: true,
        enum:{
            values:['Equipaje de mano','Bolso de mano','Equipaje Facturado','Equipaje de prueba'],
            message: '{VALUES} no es un tipo valido.'
        }
 },
 longitud:{
    type: Number,
    required: true,
 },
 ancho:{
    type: Number,
    required: true,
 },
 altura:{
    type: Number,
    required: true,
 }
},{
    strict: true,
    timestamps: true
});

module.exports = mongoose.model('equipaje', Equipajes);

