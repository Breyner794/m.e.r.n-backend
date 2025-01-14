const Roles = require('../models/rolesModels');

exports.getRoles = async (req, res) => {
    try {
        const roles = await Roles.find();
        
        if(roles.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hay roles registrados en el sistema'
            });
        }

        res.status(200).json({
            success: true,
            count: roles.length,
            data: roles,
            message: 'Roles recuperados exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los roles',
            error: error.message
        });
    }
};

exports.createRole = async (req, res) => {
    try {
        const newRole = await Roles.create(req.body);
        
        res.status(201).json({
            success: true,
            data: newRole,
            message: 'Rol creado exitosamente'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un rol con ese nombre'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al crear el rol',
            error: error.message
        });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const role = await Roles.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Rol no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: role,
            message: 'Rol actualizado exitosamente'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un rol con ese nombre'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el rol',
            error: error.message
        });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Roles.findById(req.params.id);
        
        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Rol no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: role,
            message: 'Rol recuperado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el rol',
            error: error.message
        });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const role = await Roles.findByIdAndDelete(req.params.id);

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Rol no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: role,
            message: 'Rol eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el rol',
            error: error.message
        });
    }
};

