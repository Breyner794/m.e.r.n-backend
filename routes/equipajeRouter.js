const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute } = require('../middleware/checkPermissions.js');

const {

    getEquipaje,
    createEquipajes,
    updateEquipaje,
    deleteEquipaje

} = require('../controllers/equipajeController.js');

router.use(authMiddleware);

router.get('/',checkPermission('read'), getEquipaje);
router.post('/',checkRoute('/admin/equipaje'),checkPermission('create'), createEquipajes);
router.put('/:id_equipaje',checkPermission('update'), updateEquipaje);
router.delete('/:id',checkPermission('delete'), deleteEquipaje);

module.exports = router;