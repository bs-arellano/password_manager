const mongoose = require('mongoose');

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

const Credential = mongoose.model('Credential', credentialSchema);

module.exports = Credential;