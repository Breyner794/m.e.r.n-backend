const mongoose = require('mongoose');   

const Empleado = new mongoose.Schema({

    codigo_empleado:{
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
    cargo: {
        type: String,
        required: [true, "El Cargo es obligatorio"],
        enum:{
            values: ['Capitan', 'Primer Oficial', 'Auxiliar', 'Mecanico', 'supervisor', 'gerente','Programador','Diseñador','Analista','Tester','Controladores de Trafico Aereo',
                'Administrador','Soporte','Jefe de Cabina','Ingeniero','Asistentes de Vuelo','Despachador de Vuelo','Agentes de Puerta','Jefe','Director','Vicepresidente','Presidente','Azafata'],
            message: '{VALUE} no es un cargo válido'
        }
    },
    fecha_contratacion: {
        type: Date,
        required: [true, "La fecha de contratación es obligatoria"],
        validate:{
            validator: function(date){
                return date <= new Date();
            },
            message: 'La fecha de contratación no puede ser futura',
        }
    },
    salario: {
        type: Number,
        required: true
    },
}, {
    strict: true,
    timestamps: true // Añade createdAt y updatedAt
});

module.exports = mongoose.model('Empleado', Empleado);