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
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getNotes = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const notes_model_1 = __importDefault(require("./notes.model"));
const getNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_model_1.default.find();
    return notes;
});
exports.getNotes = getNotes;
const getNoteById = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_model_1.default.findById(noteId);
    if (!note)
        return (0, throwError_1.default)('Note not found');
    return note;
});
exports.getNoteById = getNoteById;
const createNote = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_model_1.default.create(Object.assign(Object.assign({}, data), { done: false }));
    return note;
});
exports.createNote = createNote;
const updateNote = (noteId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_model_1.default.findByIdAndUpdate(noteId, data, { new: true });
    return note;
});
exports.updateNote = updateNote;
const deleteNote = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_model_1.default.findByIdAndDelete(noteId);
    return note;
});
exports.deleteNote = deleteNote;
