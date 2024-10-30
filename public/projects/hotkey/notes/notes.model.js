"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotesSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('HOTKEY_notes', NotesSchema);
