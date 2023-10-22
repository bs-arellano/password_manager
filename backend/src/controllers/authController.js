const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Verificar si el usuario o el correo electrónico ya existen en la base de datos
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });

            if (existingUser) {
                return res.status(409).json({ message: 'El usuario o correo electrónico ya existen.' });
            }

            // Crear un nuevo usuario
            const newUser = new User({ username, password, email });
            await newUser.save();

            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Verificar si el usuario existe en la base de datos
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            // Verificar la contraseña
            const isPasswordValid = user.password===password?true:false
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            // Crear un token JWT
            const payload = { id: user._id, username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ username: user.username, token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};


module.exports = authController;