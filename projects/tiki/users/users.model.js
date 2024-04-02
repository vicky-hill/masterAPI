const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firebaseID: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    pending: {
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('TIKI_User', UserSchema);