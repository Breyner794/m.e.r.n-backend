const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

const{

    getAeropuertos,
    createAeropuerto,
    getAeropuertoById,
    updateAeropuerto,
    deleteAeropuerto

}= require('../controllers/aeropuertoController');


router.use(authMiddleware);

router.get('/', checkPermission('read'), getAeropuertos);
router.get('/:codigoIATA',checkPermission('read'), getAeropuertoById);
router.post('/',checkRoute('/admin/aeropuertos'), checkPermission('create'), createAeropuerto);
router.put('/:codigoIATA',checkPermission('update'), updateAeropuerto);
router.delete('/:codigoIATA',checkPermission('delete'), deleteAeropuerto);


module.exports = router;