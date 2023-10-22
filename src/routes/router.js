const express = require('express')
const router = express.Router()
const authenticateJWT = require('./jwt_validator')

const authController = require('../controllers/authController')

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para autenticar un usuario y generar un token JWT
router.post('/login', authController.login);

router.get('/ruta-protegida', authenticateJWT, (req, res) => {
    // Aquí puedes acceder a req.user para obtener información del usuario autenticado
    res.json({ message: 'Ruta protegida', user: req.user });
});

module.exports = router