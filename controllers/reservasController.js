const Reservas = require ('../models/reservasModels.js');
const Vuelos = require('../models/vuelosModels.js');
const Pasajero = require('../models/pasajeroModel.js');

exports.getReservas = async (req, res) => {

    try{

        const reservas = await Reservas.find();

        if(reservas.lengt === 0){
            return res.status(404).json({
                success: false,
                message: 'No hay reservas registradas en el sistema por el momento.'
            });
        }
        res.status(201).json({
            success:true,
            count: reservas.length,
            data: reservas,
            message: 'Reservas recuperadas exitosamente.'
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la reserva',
            error: error.message
        });
    }
};

exports.createReservas = async (req, res) => {

    try{
        
        const {id_pasajero, id_vuelo, fecha_reserva, clase, estado_reserva } = req.body;

        const pasajero_reservado = await Pasajero.findOne({codigo_pasajero:id_pasajero});
        const vuelo_reservado = await Vuelos.findOne({numero_vuelo:id_vuelo});

        if(!pasajero_reservado){
            return res.status(404).json({
                success: false,
                message: 'El pasajero no existe'
            });
        }

        if(!vuelo_reservado){
            return res.status(404).json({
                success: false,
                message: 'Vuelo no existe'
            });
        }

        const fechaReserva = new Date(fecha_reserva);
        const fechaSalida = new Date(vuelo_reservado.fecha_y_hora_de_salida);

        if (fechaReserva >= fechaSalida) {
            return res.status(400).json({
                success: false,
                message: 'La fecha de reserva debe ser anterior a la fecha de salida del vuelo'
            });
        }

        const newReserva = new Reservas({
            id_pasajero: pasajero_reservado._id,
            id_vuelo: vuelo_reservado._id,
            fecha_reserva,
            clase,
            estado_reserva
        });

        await newReserva.save();

        res.status(201).json({
            success: true,
            data: newReserva,
            message: 'Reserva creada exitosamente'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la reserva',
                error: error.message
            });
        }
    };

    exports.updateReserva = async (req, res) => {
        try {
            const { id_pasajero, id_vuelo, fecha_reserva, clase, estado_reserva } = req.body;
    
            const pasajero_reservado = await Pasajero.findOne({ codigo_pasajero: id_pasajero });
            const vuelo_reservado = await Vuelos.findOne({ numero_vuelo: id_vuelo });
    
            // Validaciones similares...
            if (!pasajero_reservado || !vuelo_reservado) {
                return res.status(404).json({
                    success:false,
                    message: 'Pasajero o Vuelo no existe validar nuevamente.'
                });
            }
    
            // Validación de fecha
            const fechaReserva = new Date(fecha_reserva);
            const fechaSalida = new Date(vuelo_reservado.fecha_y_hora_de_salida);
    
            if (fechaReserva >= fechaSalida) {
                return res.status(400).json({
                    success: false,
                    message: 'La fecha de reserva debe ser anterior a la fecha de salida del vuelo'
                });
            }
    
            const reservaActualizada = await Reservas.findByIdAndUpdate(
                req.params.id,
                {
                    id_pasajero: pasajero_reservado._id,
                    id_vuelo: vuelo_reservado._id,
                    fecha_reserva,
                    clase,
                    estado_reserva
                },
                { new: true, runValidators: true }
            );

            if(!reservaActualizada){
                return res.status(404).json({
                    success: false,
                    message: "Reserva no encontrada"
                });
            }

            res.status(200).json({
                success: true,
                data: reservaActualizada,
                message: 'Reserva actualizada correctamente.'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la reserva',
                error: error.message
            });
        }
    };


    exports.getReservaById = async (req, res) => {
        try {
            const reserva = await Reservas.findById(req.params.id)
                .populate({
                    path: 'id_pasajero',
                    select: 'codigo_pasajero pasaporte nombre'
                })
                .populate({
                    path: 'id_vuelo',
                    select: 'numero_vuelo origen destino fecha_y_hora_de_salida fecha_y_hora_de_llegada'
                });
    
            if (!reserva) {
                return res.status(404).json({
                    success: false,
                    message: 'Reserva no encontrada'
                });
            }
    
            res.status(200).json({
                success: true,
                data: reserva,
                message: 'Reserva encontrada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la reserva',
                error: error.message
            });
        }
    };

exports.deleteReserva = async (req, res) => {

    try{

        const reserva = await Reservas.findByIdAndDelete(req.params.id);

        if(!reserva){
            return res.status(404).json({
                success: false,
                message: 'Reserva no encontrada'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Reserva eliminada exitosamente'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la reserva',
                error: error.message
            });
        }

};