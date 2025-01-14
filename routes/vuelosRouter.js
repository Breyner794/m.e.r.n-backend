const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

const {

    getVuelos,
    createVuelo,
    updateVuelo,
    deleteVuelo,
    getVueloByNumero

} = require('../controllers/vuelosController.js');

router.use(authMiddleware);

router.get('/',checkPermission('read'), getVuelos);
router.post('/',checkRoute('/admin/vuelos'), checkPermission('create'), createVuelo);
router.put('/:numero_vuelo',checkPermission('update'), updateVuelo);
router.delete('/:numero_vuelo',checkPermission('delete'), deleteVuelo);
router.get('/:numero_vuelo',checkPermission('read'), getVueloByNumero);

module.exports = router;
