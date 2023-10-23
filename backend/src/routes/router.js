const express = require('express')
const router = express.Router()
const authenticateJWT = require('./jwt_validator')

const authController = require('../controllers/authController')
const credentialController = require('../controllers/credentialController')
const utils = require('../utils/utils')

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para autenticar un usuario y generar un token JWT
router.post('/login', authController.login);

router.get('/credentials', authenticateJWT, credentialController.getCredentials);

router.post("/add_credential", authenticateJWT, credentialController.addCredential)

router.delete("/credential/delete", authenticateJWT, credentialController.deleteCredential)

router.post("/generate", authenticateJWT, utils.passwordGenerator)

module.exports = router