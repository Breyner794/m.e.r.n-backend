const Pasajero = require('../models/pasajeroModel.js');

// Obtener todos los pasajeros
exports.getPasajeros = async (req, res) => {
    try {
        const pasajeros = await Pasajero.find();

        if (pasajeros.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hay pasajeros registrados en el sistema'
            });
        }
        res.status(200).json({
            success: true,
            count: pasajeros.length,
            data: pasajeros,
            message: 'Pasajeros recuperados exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar los pasajeros',
            error: error.message
        });
    }   
};

// Crear un nuevo pasajero
exports.createPasajero = async (req, res) => {   
    try {
        // Validar si ya existe un pasajero con el mismo código
        const existeCodigo = await Pasajero.findOne({ codigo_pasajero: req.body.codigo_pasajero });
        if (existeCodigo) {
            return res.status(400).json({
                success: false,
                message: `Ya existe un pasajero con el código ${req.body.codigo_pasajero}`
            });
        }

        // Validar si ya existe un pasajero con el mismo pasaporte
        const existePasaporte = await Pasajero.findOne({ pasaporte: req.body.pasaporte });
        if (existePasaporte) {
            return res.status(400).json({
                success: false,
                message: `Ya existe un pasajero con el pasaporte ${req.body.pasaporte}`
            });
        }

        // Validar si ya existe un pasajero con el mismo email
        const existeEmail = await Pasajero.findOne({ email: req.body.email });
        if (existeEmail) {
            return res.status(400).json({
                success: false,
                message: `Ya existe un pasajero con el email ${req.body.email}`
            });
        }

        const pasajero = new Pasajero(req.body);
        const nuevoPasajero = await pasajero.save();
        
        res.status(201).json({
            success: true,
            data: nuevoPasajero,
            message: 'Pasajero registrado exitosamente'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el pasajero',
            error: error.message
        });
    }
};

// Actualizar un pasajero
exports.updatePasajero = async (req, res) => {
    try {
        // Encontrar el pasajero actual
        const pasajeroActual = await Pasajero.findOne({ codigo_pasajero: req.params.codigo_pasajero });
        
        if (!pasajeroActual) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un pasajero con el código ${req.params.codigo_pasajero}`
            });
        }

        // Validar pasaporte duplicado (si se está actualizando)
        if (req.body.pasaporte && req.body.pasaporte !== pasajeroActual.pasaporte) {
            const existePasaporte = await Pasajero.findOne({ pasaporte: req.body.pasaporte });
            if (existePasaporte) {
                return res.status(400).json({
                    success: false,
                    message: `Ya existe otro pasajero con el pasaporte ${req.body.pasaporte}`
                });
            }
        }

        // Validar email duplicado (si se está actualizando)
        if (req.body.email && req.body.email !== pasajeroActual.email) {
            const existeEmail = await Pasajero.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    success: false,
                    message: `Ya existe otro pasajero con el email ${req.body.email}`
                });
            }
        }

        // Actualizar el pasajero
        const pasajeroActualizado = await Pasajero.findOneAndUpdate(
            { codigo_pasajero: req.params.codigo_pasajero },
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: pasajeroActualizado,
            message: 'Pasajero actualizado exitosamente'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el pasajero',
            error: error.message
        });
    }
};

// Obtener un pasajero por código
exports.getPasajeroById = async (req, res) => {
    try {
        const pasajero = await Pasajero.findOne({ codigo_pasajero: req.params.codigo_pasajero });

        if (!pasajero) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un pasajero con el código ${req.params.codigo_pasajero}`
            });
        }

        res.status(200).json({
            success: true,
            data: pasajero,
            message: 'Pasajero encontrado exitosamente'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el pasajero',
            error: error.message
        });
    }
};

// Eliminar un pasajero
exports.deletePasajero = async (req, res) => {
    try {
        const pasajero = await Pasajero.findOneAndDelete({ codigo_pasajero: req.params.codigo_pasajero });

        if (!pasajero) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un pasajero con el código ${req.params.codigo_pasajero}`
            });
        }   

        res.status(200).json({
            success: true,
            data: pasajero,
            message: `Pasajero con código ${req.params.codigo_pasajero} eliminado exitosamente`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el pasajero',
            error: error.message
        });
    }   
};