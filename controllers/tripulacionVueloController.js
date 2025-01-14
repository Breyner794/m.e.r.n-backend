const Tripulacion_de_vuelo = require('../models/tripulacionVueloModels.js');
const Vuelos = require('../models/vuelosModels.js');
const Empleado = require('../models/empleadosModel.js');

exports.getTripulacion = async (req, res)=>{

    try{
        
        const tripulacion = await Tripulacion_de_vuelo.find()
        .populate({
            path: 'id_empleado',
            select: 'codigo_empleado nombre apellido'
        })
        .populate({
            path: 'id_vuelo',
            populate: [
                {
                    path: 'origen',
                    select: 'Codigo_IATA'
                },
                {
                    path: 'destino',
                    select: 'Codigo_IATA'
                }
            ],
            select: 'numero_vuelo origen destino'
        });
        

        if(!tripulacion || tripulacion.length===0){
            return res.status(404).json({
                success: false,
                message: 'La tripulacion no existe o no hay datos registrados'
            });
        }

        res.status(200).json({
            sucess: true,
            count:tripulacion.length,
            data: tripulacion,
            message: 'Tripulaciones encontradas exitosamente'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error General',
                error: error.message
            });
        }
};

exports.createTripulacion = async (req, res) => {

    try{

        const {id_vuelo, id_empleado, rol} = req.body
        
        const vuelo_id = await Vuelos.findOne({numero_vuelo:id_vuelo});
        const empleado_id = await Empleado.findOne({codigo_empleado:id_empleado})

        if(!vuelo_id){
            return res.status(404).json({
                sucess: false,
                message: 'Vuelo no existe'
            });
        }
        if(!empleado_id){
            return res.status(404).json({
                sucess: false,
                message: 'Empleado no existe'
            });
        }

        const newTripulacion = new Tripulacion_de_vuelo({
            id_vuelo:vuelo_id._id,
            id_empleado: empleado_id._id,
            rol,
        });

        await newTripulacion.save();

        res.status(201).json({
            success: true,
            data: newTripulacion,
            message: 'Se ha Creado exitosamente la Tripulacion.'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error General',
                error: error.message
            });
        }
};

exports.updateTripulacion = async (req, res) =>{

    try{

        const {id_vuelo, id_empleado, rol} = req.body
        
        const vuelo_id = await Vuelos.findOne({numero_vuelo:id_vuelo});
        const empleado_id = await Empleado.findOne({codigo_empleado:id_empleado})

        if(!vuelo_id){
            return res.status(404).json({
                sucess: false,
                message: 'Vuelo no existe'
            });
        }
        if(!empleado_id){
            return res.status(404).json({
                sucess: false,
                message: 'Empleado no existe'
            });
        }

        const tripulacionActualizada = await Tripulacion_de_vuelo.findByIdAndUpdate(req.params.id,
            {
                id_vuelo:vuelo_id._id,
                id_empleado: empleado_id._id,
                rol,
            },
            { new: true, runValidators: true }
        );

        if(!tripulacionActualizada){
            return res.status(404).json({
                sucess: false,
                message: 'Tripulacion no se pudo encontrar o no existe'
            });
        }

        res.status(200).json({
            success: true,
            data: tripulacionActualizada,
            message: 'Tripulacion actualizada correctamente.'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error General',
                error: error.message
            });
        }

};

exports.getTripulacionById = async (req, res)=>{

    try{
        
        const tripulacion = await Tripulacion_de_vuelo.findById(req.params.id)
        .populate({
            path: 'id_empleado',
            select: 'codigo_empleado nombre apellido'
        })
        .populate({
            path: 'id_vuelo',
            populate: [
                {
                    path: 'origen',
                    select: 'Codigo_IATA'
                },
                {
                    path: 'destino',
                    select: 'Codigo_IATA'
                }
            ],
            select: 'numero_vuelo origen destino'
        });
        

        if(!tripulacion || tripulacion.length===0){
            return res.status(404).json({
                success: false,
                message: 'La tripulacion no existe'
            });
        }

        res.status(200).json({
            sucess: true,
            data: tripulacion,
            message: 'Tripulaciones encontradas exitosamente'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error General',
                error: error.message
            });
        }
};

exports.deleteTripulacion = async (req, res) => {
    try{

        const tripulacion = await Tripulacion_de_vuelo.findByIdAndDelete(req.params.id)
        if(!tripulacion){
            res.status(404).json({
                success: false,
                message: 'La tripulacion no existe'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Tripulacion de vuelo eliminada exitosamente'
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error General',
            error: error.message
        });
    }
};