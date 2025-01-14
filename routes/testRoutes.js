const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Ruta protegida accedida exitosamente',
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role.name
    }
  });
});

module.exports = router;