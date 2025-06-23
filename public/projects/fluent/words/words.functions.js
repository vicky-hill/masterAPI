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
exports.createWord = exports.getWords = void 0;
const words_model_1 = __importDefault(require("./words.model"));
const getWords = (language) => __awaiter(void 0, void 0, void 0, function* () {
    const wordInstances = yield words_model_1.default.find({
        [language]: { $exists: true, $ne: "" }
    }).populate('image').lean();
    const words = wordInstances.map((wordInstance) => ({
        _id: wordInstance._id,
        english: wordInstance.english,
        target: wordInstance[language],
        image: wordInstance.image
    }));
    return words;
});
exports.getWords = getWords;
const createWord = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const wordInstance = yield words_model_1.default.create(Object.assign({}, data));
    const word = wordInstance.toObject();
    return word;
});
exports.createWord = createWord;
