const Vuelos = require('../models/vuelosModels.js');
const Aeropuerto = require('../models/aeropuertosModel.js');
const Avion = require('../models/avionesModel.js');

exports.getVuelos = async (req, res) => {
    try {
        const vuelos = await Vuelos.find()
        .populate('origen')
        .populate('destino')
        .populate('id_avion');
        if(vuelos.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hay vuelos registrados en el sistema'
            });
        }
        res.status(200).json({
            success: true,
            count: vuelos.length,
            data: vuelos,
            message: 'Vuelos recuperados exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los vuelos',
            error: error.message
        });
    }
};

exports.createVuelo = async (req, res) => {

    try {

        const { numero_vuelo, origen, destino, fecha_y_hora_de_salida, fecha_y_hora_de_llegada, estado_del_vuelo, id_avion } = req.body;

        const aeropuertoOrigen = await Aeropuerto.findOne({ Codigo_IATA: origen });
        const aeropuertoDestino = await Aeropuerto.findOne({ Codigo_IATA: destino });
        const aviones = await Avion.findOne({ codigo_avion: id_avion});

        console.log('Código Origen recibido:', origen);
        console.log('Código Destino recibido:', destino);
        console.log('Aeropuerto Origen encontrado:', aeropuertoOrigen);
        console.log('Aeropuerto Destino encontrado:', aeropuertoDestino);

        if (!aeropuertoOrigen) {
            return res.status(404).json({
                success: false,
                message: 'El aeropuerto de origen no existe'
            });
        }
        if (!aeropuertoDestino) {
            return res.status(404).json({
                success: false,
                message: 'El aeropuerto de destino no existe'
            });
        }

        if (origen === destino) {
            return res.status(400).json({
                success: false,
                message: 'El origen y destino no pueden ser el mismo aeropuerto',
                origen: codigo_origen,
                destino: codigo_destino
            });
        }
        
        if (!aviones) {
            return res.status(404).json({
                success: false,
                message: 'Avion no existe'
            });
        }

        const newVuelo = new Vuelos({
            numero_vuelo,
            origen: aeropuertoOrigen._id,
            destino: aeropuertoDestino._id,
            fecha_y_hora_de_salida,
            fecha_y_hora_de_llegada,
            estado_del_vuelo,
            id_avion: aviones._id
        });

        await newVuelo.save();
        res.status(201).json({
            success: true,
            data: newVuelo,
            message: 'Vuelo creado exitosamente'    
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el vuelo',
            error: error.message
        });
    }
};

exports.updateVuelo = async (req, res) => {
    try {
        const { numero_vuelo, origen, destino, fecha_y_hora_de_salida, fecha_y_hora_de_llegada, estado_del_vuelo, id_avion } = req.body;

        // Buscar aeropuertos por código IATA
        const aeropuertoOrigen = await Aeropuerto.findOne({ Codigo_IATA: origen });
        const aeropuertoDestino = await Aeropuerto.findOne({ Codigo_IATA: destino });
        const aviones = await Avion.findOne({ codigo_avion: id_avion });

        if (!aeropuertoOrigen || !aeropuertoDestino) {
            return res.status(404).json({
                success: false,
                message: 'El aeropuerto de origen o destino no existe'
            });
        }
        
        if (origen === destino) {
            return res.status(400).json({
                success: false,
                message: 'El origen y destino no pueden ser el mismo aeropuerto',
                origen: codigo_origen,
                destino: codigo_destino
            });
        }

        if (!aviones) {
            return res.status(404).json({
                success: false,
                message: 'El avión no existe'
            });
        }

        // Actualizar el vuelo
        const vueloActualizado = await Vuelos.findOneAndUpdate(
            {numero_vuelo: req.params.numero_vuelo},
            {
                numero_vuelo,
                origen: aeropuertoOrigen._id,
                destino: aeropuertoDestino._id,
                fecha_y_hora_de_salida,
                fecha_y_hora_de_llegada,
                estado_del_vuelo,
                id_avion: aviones._id
            },
            { new: true, runValidators: true } // Opciones para devolver el documento actualizado y ejecutar validaciones
        );

        if (!vueloActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Vuelo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: vueloActualizado,
            message: 'Vuelo actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el vuelo',
            error: error.message
        });
    }
};

exports.getVueloByNumero = async (req, res) => {
    try {
        const vuelo = await Vuelos.findOne({ numero_vuelo: req.params.numero_vuelo })
            .populate('origen', 'Nombre Ciudad Pais Codigo_IATA')
            .populate('destino', 'Nombre Ciudad Pais Codigo_IATA')
            .populate('id_avion', 'codigo_avion modelo capacidad estado_avion');

        if (!vuelo) {
            return res.status(404).json({
                success: false,
                message: 'Vuelo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: vuelo,
            message: 'Vuelo encontrado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el vuelo',
            error: error.message
        });
    }
};

exports.deleteVuelo = async (req, res) => {
    try {
        const vuelo = await Vuelos.findOneAndDelete({ numero_vuelo: req.params.numero_vuelo });

        if (!vuelo) {
            return res.status(404).json({
                success: false,
                message: 'Vuelo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Vuelo eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el vuelo',
            error: error.message
        });
    }
};