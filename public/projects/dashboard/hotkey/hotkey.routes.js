"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_dashboard_1 = require("./notes.dashboard");
const router = express_1.default.Router();
/* ====================================
   Notes @ api/dashboard/hotkey/notes
==================================== */
router.route('/notes').get(notes_dashboard_1.getNotes);
router.route('/notes').post(notes_dashboard_1.createNote);
router.route('/notes/:noteId').get(notes_dashboard_1.getNote);
router.route('/notes/:noteId').delete(notes_dashboard_1.deleteNote);
router.route('/notes/:noteId').put(notes_dashboard_1.updateNote);
exports.default = router;
