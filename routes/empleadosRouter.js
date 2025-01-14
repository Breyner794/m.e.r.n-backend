const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

const {

    getEmpleados,
    createEmpleado,
    updateEmpleado,
    getEmpleadoById,
    deleteEmpleado

}= require('../controllers/empleadoController.js');

router.use(authMiddleware);

router.get('/',checkPermission('read'), getEmpleados);
router.post('/',checkRoute('/admin/empleados'),checkPermission('create'), createEmpleado);
router.put('/:codigo_empleado',checkPermission('update'), updateEmpleado);
router.get('/:codigo',checkPermission('read'), getEmpleadoById);
router.delete('/:codigo',checkPermission('delete'), deleteEmpleado);

module.exports = router;