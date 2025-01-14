const Aeropuerto = require('../models/aeropuertosModel.js');

// Obtener todos los aeropuertos
exports.getAeropuertos = async (req, res) => {
    try {
        const aeropuertos = await Aeropuerto.find();
        if (aeropuertos.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hay aeropuertos registrados en el sistema'
            });
        }
        res.status(200).json({
            success: true,
            count: aeropuertos.length,
            data: aeropuertos,
            message: 'Aeropuertos recuperados exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar los aeropuertos',
            error: error.message
        });
    }
};

// Crear un nuevo aeropuerto
exports.createAeropuerto = async (req, res) => {
    try {
        const existeAeropuerto = await Aeropuerto.findOne({ Codigo_IATA: req.body.Codigo_IATA });
        if (existeAeropuerto) {
            return res.status(400).json({
                success: false,
                message: `Ya existe un aeropuerto con el código IATA ${req.body.Codigo_IATA}`
            });
        }

        const aeropuerto = new Aeropuerto({
            Nombre: req.body.Nombre,
            Ciudad: req.body.Ciudad,
            Pais: req.body.Pais,
            Codigo_IATA: req.body.Codigo_IATA,
        });

        const nuevoAeropuerto = await aeropuerto.save();
        res.status(201).json({
            success: true,
            data: nuevoAeropuerto,
            message: 'Aeropuerto creado exitosamente'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el aeropuerto',
            error: error.message
        });
    }
};

// Obtener un aeropuerto por código IATA
exports.getAeropuertoById = async (req, res) => {
    try {
        const aeropuerto = await Aeropuerto.findOne({ Codigo_IATA: req.params.codigoIATA });
        if (!aeropuerto) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el aeropuerto con código IATA: ${req.params.codigoIATA}`
            });
        }
        res.status(200).json({
            success: true,
            data: aeropuerto,
            message: 'Aeropuerto encontrado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el aeropuerto',
            error: error.message
        });
    }
};

// Actualizar un aeropuerto
exports.updateAeropuerto = async (req, res) => {
    try {
        const aeropuerto = await Aeropuerto.findOne({ Codigo_IATA: req.params.codigoIATA });
        if (!aeropuerto) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el aeropuerto con código IATA: ${req.params.codigoIATA}`
            });
        }

        // Actualizar campos si están presentes en la solicitud
        if (req.body.Nombre) aeropuerto.Nombre = req.body.Nombre;
        if (req.body.Ciudad) aeropuerto.Ciudad = req.body.Ciudad;
        if (req.body.Pais) aeropuerto.Pais = req.body.Pais;

        const aeropuertoActualizado = await aeropuerto.save();
        res.status(200).json({
            success: true,
            data: aeropuertoActualizado,
            message: 'Aeropuerto actualizado exitosamente'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el aeropuerto',
            error: error.message
        });
    }
};

// Eliminar un aeropuerto
exports.deleteAeropuerto = async (req, res) => {
    try {
        const aeropuerto = await Aeropuerto.findOne({ Codigo_IATA: req.params.codigoIATA });
        if (!aeropuerto) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el aeropuerto con código IATA: ${req.params.codigoIATA}`
            });
        }

        await aeropuerto.deleteOne();
        res.status(200).json({
            success: true,
            message: `Aeropuerto con código IATA ${req.params.codigoIATA} eliminado exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el aeropuerto',
            error: error.message
        });
    }
};