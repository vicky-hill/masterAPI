"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
const notes_model_1 = __importDefault(require("../../hotkey/notes/notes.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield notes_model_1.default.find();
        res.json(notes);
    }
    catch (err) {
        err.ctrl = exports.getNotes;
        next(err);
    }
});
exports.getNotes = getNotes;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        const note = yield notes_model_1.default.findById(noteId);
        if (!note)
            return (0, throwError_1.default)('Note not found');
        res.json(note);
    }
    catch (err) {
        err.ctrl = exports.getNote;
        next(err);
    }
});
exports.getNote = getNote;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const note = yield notes_model_1.default.create(req.body);
        res.json(note);
    }
    catch (err) {
        err.ctrl = exports.createNote;
        next(err);
    }
});
exports.createNote = createNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { noteId } = req.params;
        const updatedNote = yield notes_model_1.default.findByIdAndUpdate(noteId, req.body, { new: true });
        res.json(updatedNote);
    }
    catch (err) {
        err.ctrl = exports.updateNote;
        next(err);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        const note = yield notes_model_1.default.findByIdAndDelete(noteId);
        res.json(note);
    }
    catch (err) {
        err.ctrl = exports.deleteNote;
        next(err);
    }
});
exports.deleteNote = deleteNote;
