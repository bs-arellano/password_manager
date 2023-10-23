const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const { DB_ENCRYPTION_KEY, DB_SIGNARURE_KEY } = require('../configs/constants')

const credentialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

credentialSchema.plugin(encrypt, { encryptionKey: DB_ENCRYPTION_KEY, signingKey: DB_SIGNARURE_KEY, excludeFromEncryption: ['user']  })

const Credential = mongoose.model('Credential', credentialSchema);

module.exports = Credential;