const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

const{

    getTripulacion,
    createTripulacion,
    updateTripulacion,
    getTripulacionById,
    deleteTripulacion,

}= require('../controllers/tripulacionVueloController.js');

router.use(authMiddleware);

router.get('/',checkPermission('read'), getTripulacion);
router.get('/:id',checkPermission('read'), getTripulacionById);
router.post('',checkRoute('/admin/tripulacion'), checkPermission('create'), createTripulacion);
router.put('/:id',checkPermission('update'),updateTripulacion);
router.delete('/:id',checkPermission('delete'),deleteTripulacion);

module.exports = router;