const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'HOTSAUCE_Cart'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('HOTSAUCE_User', UserSchema);