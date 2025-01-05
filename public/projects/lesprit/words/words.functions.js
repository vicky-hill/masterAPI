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
exports.deleteWord = exports.updateWord = exports.getReview = exports.getWord = exports.getWords = exports.createWord = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const words_model_1 = __importDefault(require("./words.model"));
const createWord = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newWord = yield words_model_1.default.create(Object.assign(Object.assign({}, data), { user: userId }));
    const word = yield words_model_1.default.findById(newWord._id).populate({
        path: 'list',
        select: 'title'
    });
    return word;
});
exports.createWord = createWord;
const getWords = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const words = yield words_model_1.default.find({ user: userId }).populate({
        path: 'list',
        select: 'title'
    }).sort({ createdAt: -1 });
    return words;
});
exports.getWords = getWords;
const getWord = (wordId) => __awaiter(void 0, void 0, void 0, function* () {
    const word = yield words_model_1.default.findById(wordId);
    if (!word)
        (0, throwError_1.default)('Word not found');
    return word;
});
exports.getWord = getWord;
const getReview = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield words_model_1.default.find({ dueDate: { $lte: Date.now() }, user: userId });
    return review;
});
exports.getReview = getReview;
const updateWord = (data, wordId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateWord = yield words_model_1.default.findByIdAndUpdate(wordId, data, { new: true });
    if (!updateWord)
        return (0, throwError_1.default)('Word not found');
    const word = yield words_model_1.default.findById(updateWord._id).populate({
        path: 'list',
        select: 'title'
    });
    return word;
});
exports.updateWord = updateWord;
const deleteWord = (wordId) => __awaiter(void 0, void 0, void 0, function* () {
    const word = yield words_model_1.default.findByIdAndDelete(wordId);
    if (!word)
        (0, throwError_1.default)('Word not found');
    return word;
});
exports.deleteWord = deleteWord;
