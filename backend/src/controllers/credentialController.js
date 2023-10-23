const Credential = require('../models/credentialModel');
const User = require('../models/userModel');

const credentialController = {
    getCredentials: async (req, res) => {
        try {
            const credentials = await Credential.find({ user: req.user });
            res.json(credentials);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener las credenciales' });
        }

    },
    addCredential: async (req, res) => {
        const user = req.user
        const { url, username, password } = req.body
        try {
            const newCredential = new Credential({ user: user, url: url, userName: username, password: password })
            await newCredential.save()
            res.status(201).json({ message: 'Credencial guardada exitosamente.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
    deleteCredential: async (req, res) => {
        const {id} = req.body
        try{
            await Credential.findOneAndDelete(id)
            res.status(201).json({ message: 'Credencial borrada exitosamente.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}

module.exports = credentialController