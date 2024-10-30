"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const notes_controller_1 = __importDefault(require("./notes.controller"));
/**
 * @route /api/notes
 * @get get all notes
 * @post save a notes
 */
router
    .route('/')
    .get(notes_controller_1.default.getNotes);
// .post(notesCtrl.createNotes)
/**
 * @route /api/notes/:notesId
 * @get notes
 * @update notes
 * @delete notes
 */
router
    .route('/:notesId');
// .get(notesCtrl.getNotesById)
// .put(notesCtrl.updateNotes)
// .delete(notesCtrl.deleteNotes)
exports.default = router;
