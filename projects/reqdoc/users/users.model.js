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
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_TEAM'
    },
    role:  {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    type: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    }, 
    deleted: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('REQDOC_User', UserSchema);