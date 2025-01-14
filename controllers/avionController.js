const Aviones = require('../models/avionesModel.js');

exports.getAviones = async (req, res) => {
    try{

        const aviones = await Aviones.find();
        if(aviones.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No hay aviones registrados en el sistema'
            });
        }

        res.status(200).json({
            success: true,
            count: aviones.length,
            data: aviones,
            message: 'Aviones recuperados exitosamente'
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar los aviones',
            error: error.message
        });
    }
};

exports.createAvion = async (req, res) => {

    try{

        const newavion = new Aviones({
            codigo_avion: req.body.codigo_avion,
            modelo: req.body.modelo,
            capacidad: req.body.capacidad,
            year_fabricacion: req.body.year_fabricacion,
            estado_avion: req.body.estado_avion
        });

        const avion = await newavion.save();

        res.status(201).json({
            success: true,
            data: avion,
            message: 'Avión creado exitosamente'
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el avión',
            error: error.message
        });
    }

};

exports.updateAvion = async (req, res) => {
    try {
        const avion = await Aviones.findOneAndUpdate(
            { codigo_avion: req.params.codigo }, // Buscar por código en lugar de _id
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!avion) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el avión con código: ${req.params.codigo}`
            });
        }

        res.status(200).json({
            success: true,
            data: avion,
            message: 'Avión actualizado exitosamente'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el avión',
            error: error.message
        });
    }
};

exports.getAvionesbyId = async (req, res) => {

    try{

        const avion = await Aviones.findOne({ codigo_avion: req.params.codigo });
        if(!avion){
            return res.status(404).json({
                success: false,
                message: `No se encontró el avión con código: ${req.params.codigo}`
            });
        }

        res.status(200).json({
            success: true,
            data: avion
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar el avión',
            error: error.message
        });
    }   

};

exports.deleteAviones = async (req, res) => {

    try{

        const avion = await Aviones.findOneAndDelete({ codigo_avion: req.params.codigo });
        
        if(!avion) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el avión con código: ${req.params.codigo}`
            });
        }

        res.status(200).json({
            success: true,
            message: `Avión con código ${req.params.codigo} eliminado exitosamente`
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear los aviones',
            error: error.message
        });

    }

};