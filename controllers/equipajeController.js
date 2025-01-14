const Equipaje = require('../models/equipajeModel.js');
const Reservas = require('../models/reservasModels.js');

exports.getEquipaje = async (req, res) =>{

    try{
        const equipaje = await Equipaje.find();
        if(!equipaje.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No hay equipajes registrado en este momento.'
            });
        }

        res.status(201).json({
            success:true,
            count:equipaje.length,
            data:equipaje,
            message: 'Equipajes recuperado exitosamente.'
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los vuelos',
            error: error.message
        });
    }
};

exports.createEquipajes = async (req, res) =>{

    try{

        const { id_reserva, peso, tipo, longitud, ancho, altura }=req.body;

        const reserva_id = await Reservas.findById(id_reserva);

        if(!reserva_id){
            return res.status(404).json({
                success: false,
                message: 'La reserva no existe'
            });
        }

        const newEquipaje = new Equipaje({
            id_reserva: reserva_id._id,
            peso,
            tipo,
            longitud,
            ancho,
            altura
        });

        await newEquipaje.save();

        res.status(201).json({
            success: true,
            data: newEquipaje,
            message: 'Equipaje creado exitosamente'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al crear el equipaje',
                error: error.message
            });
        }

};

exports.updateEquipaje = async (req, res) =>{

    try{
        
        const {id_reserva, peso, tipo, longitud, ancho, altura} = req.body

        const reserva_id = await Reservas.findById(id_reserva);

        if(!reserva_id){
            return res.status(404).json({
                success: false,
                message: 'La reserva no existe'
            });
        }

        const equipajeActualizado = await Equipaje.findByIdAndUpdate(
            req.params.id_equipaje,
            {

                id_reserva: reserva_id._id,
                peso,
                tipo,
                longitud,
                ancho,
                altura
        },
        {new: true, runValidators: true}
    );

        if(!equipajeActualizado){
            return res.status(404).json({
                success: false,
                message: 'Equipaje no encontrado.',
            });
        }

        res.status(200).json({
            success: true,
            data: equipajeActualizado,
            message: 'Equipaje actualizado exitosamente'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error General',
                error: error.message
            });
        }
};

exports.deleteEquipaje = async (req, res)=>{

    try{
        const deleteEquipajes = await Equipaje.findByIdAndDelete(req.params.id)

        if(!deleteEquipajes){
            return res.status(404).json({
                success:true,
                message: 'Equipaje no encontrado.'
            });
        };

        res.status(200).json({
            success: true,
            data: deleteEquipajes,
            message: 'Equipaje elimiando exitosamente.'
        });

        }catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error General',
                error: error.message
            });
        }

};