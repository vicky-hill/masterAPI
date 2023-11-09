const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: {
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

module.exports = mongoose.model('Squirreled_User', UserSchema);