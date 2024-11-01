"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const notes_controller_1 = require("./notes.controller");
// api/notes
router.route('/').get(notes_controller_1.getNotes);
router.route('/').post(notes_controller_1.createNote);
// api/notes/:noteId
router
    .route('/:noteId')
    .get(notes_controller_1.getNoteById)
    .put(notes_controller_1.updateNote)
    .delete(notes_controller_1.deleteNote);
exports.default = router;
