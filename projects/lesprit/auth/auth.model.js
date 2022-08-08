const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // email: {
    //     type: String,
    //     required: false,
    //     unique: false
    // },
    password: {
        type: String,
        required: true,
        minlength: 3
    }, 
    languages: {
        type: Array,
        default: [{foreign: 'spanish', native: 'english'}],
        required: true
    }
});


module.exports = mongoose.model('Lesprit_User', UserSchema);