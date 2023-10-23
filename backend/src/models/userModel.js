const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const { DB_ENCRYPTION_KEY, DB_SIGNARURE_KEY } = require('../configs/constants')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

userSchema.plugin(encrypt, { encryptionKey: DB_ENCRYPTION_KEY, signingKey: DB_SIGNARURE_KEY })

const User = mongoose.model('User', userSchema);

module.exports = User;