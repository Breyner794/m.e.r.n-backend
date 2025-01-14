const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

const{
    getPasajeros,
    createPasajero,
    updatePasajero,
    getPasajeroById,
    deletePasajero
}= require('../controllers/pasajeroController.js');

router.use(authMiddleware);

router.get('/',checkPermission('read'), getPasajeros);
router.post('/',checkRoute('/admin/pasajeros'), checkPermission('create'), createPasajero);
router.put('/:codigo_pasajero', updatePasajero);
router.get('/:codigo_pasajero',checkPermission('update'), getPasajeroById);
router.delete('/:codigo_pasajero',checkPermission('delete'), deletePasajero);

module.exports = router;
