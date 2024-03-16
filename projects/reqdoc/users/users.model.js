const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firebaseID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    type: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('REQDOC_User', UserSchema);