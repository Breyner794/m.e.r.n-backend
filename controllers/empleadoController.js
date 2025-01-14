const Empleado = require('../models/empleadosModel');  

// @desc    Get all empleados
exports.getEmpleados = async (req, res, next) => {

    try{

        const empleados = await Empleado.find();
    if (empleados.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No hay empleados registrados en el sistema'
        });
    }
    res.status(200).json({
        success: true,
        count: empleados.length,
        data: empleados,
        message: 'Empleados recuperados exitosamente'
    });
        
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar los empleados',
            error: error.message
        });

    }
};

// @desc    Create a new empleado

exports.createEmpleado = async (req, res, next) => {   

    try{
        const existeEmpleado = await Empleado.findOne({ codigo_empleado: req.body.codigo_empleado });
        if (existeEmpleado) {
            return res.status(400).json({
                success: false,
                message: `Ya existe un empleado con el código ${req.body.codigo_empleado}`
            });
        }

        const empleado = new Empleado({
            codigo_empleado: req.body.codigo_empleado,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fecha_nacimiento: req.body.fecha_nacimiento,
            cargo: req.body.cargo,
            fecha_contratacion: req.body.fecha_contratacion,
            salario: req.body.salario,
        });

        const nuevoEmpleado = await empleado.save();
        res.status(201).json({
            success: true,
            data: nuevoEmpleado,
            message: 'Empleado creado exitosamente'
        });
    }catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el empleado',
            error: error.message
        });
    }   

};

exports.updateEmpleado = async (req, res) => {

    try{

        const existeEmpleado = await Empleado.findOne({ codigo_empleado: req.params.codigo_empleado });
        if (!existeEmpleado) {
            return res.status(400).json({
                success: false,
                message: `Ya existe un empleado con el código ${req.body.codigo_empleado}`
            });
        }

        const empleado = await Empleado.findOneAndUpdate(
            { codigo_empleado: req.params.codigo_empleado },
            req.body,
            {
                new: true,
                runValidators: true // Ejecuta las validaciones del esquema en los datos actualizados
            }
        );

        if (!empleado) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un empleado con el código ${req.params.codigo}`
            });
        }

        res.status(200).json({
            success: true,
            data: empleado,
            message: 'Empleado actualizado exitosamente'
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el empleado',
            error: error.message
        });
    }

};

exports.getEmpleadoById = async (req, res) => {

    try{

        const empleado = await Empleado.findOne({ codigo_empleado: req.params.codigo });
        if (!empleado) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un empleado con el código ${req.params.codigo}`
            });
        }

        res.status(200).json({
            success: true,
            data: empleado,
            message: 'Empleado encontrado exitosamente'
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el empleado',
            error: error.message
        });
    }

};

exports.deleteEmpleado = async (req, res) => {

    try{

        const empleado = await Empleado.findOneAndDelete({ codigo_empleado: req.params.codigo });

        if (!empleado) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un empleado con el código ${req.params.codigo}`
            });
        }

        res.status(200).json({
            success: true,
            data: empleado,
            message: 'Empleado eliminado exitosamente'});
        
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el empleado',
            error: error.message
        });
    }

};