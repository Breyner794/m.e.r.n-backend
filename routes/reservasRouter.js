const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

const {
    getReservas,
    getReservaById,
    createReservas,
    updateReserva,
    deleteReserva
} = require('../controllers/reservasController.js');

router.use(authMiddleware);

router.get('/',checkPermission('read'),getReservas);
router.get('/:id',checkPermission('read'),getReservaById);
router.post('/',checkRoute('/admin/reservas'), checkPermission('create'),createReservas);
router.put('/:id',checkPermission('update'),updateReserva);
router.delete('/:id',checkPermission('delete'),deleteReserva);

module.exports = router;