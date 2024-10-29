const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    done: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('HOTKEY_notes', NotesSchema);