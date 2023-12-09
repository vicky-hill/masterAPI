const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firebaseID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('TIKI_User', UserSchema);