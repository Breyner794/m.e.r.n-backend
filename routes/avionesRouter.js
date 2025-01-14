const express = require('express'); 
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

const {

    getAviones,
    createAvion,
    getAvionesbyId,
    updateAvion,
    deleteAviones

} = require('../controllers/avionController.js');

router.use(authMiddleware);

router.get('/', getAviones);
router.post('/',checkRoute('/admin/aviones'),checkPermission('create'), createAvion);
router.get('/:codigo',checkPermission('read'), getAvionesbyId);
router.put('/:codigo',checkPermission('update'), updateAvion);
router.delete('/:codigo',checkPermission('delete'), deleteAviones);

module.exports = router;