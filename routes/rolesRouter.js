const express = require('express');
const router = express.Router();

const{

    getRoles,
    createRole,
    updateRole,
    deleteRole

} = require('../controllers/rolesController.js');

router.get('/roles', getRoles);
router.post('/roles', createRole);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

module.exports = router;    
