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
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_Team'
    }],
    roles: [{
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'REQDOC_TEAM'
        },
        role: {
            type: String,
            enum: ['admin', 'user']
        },
    }],
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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('REQDOC_User', UserSchema);