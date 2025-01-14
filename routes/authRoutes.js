const express = require('express');
const router = express.Router();
const { login, register, getUsers} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth.js')
const { checkPermission, checkRoute} = require('../middleware/checkPermissions.js');

router.post('/login', login);
router.post('/register',checkRoute('/admin/register'),checkPermission('create'), register);
router.get('/user',authMiddleware, getUsers)

module.exports = router;