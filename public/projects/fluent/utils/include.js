"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPhrases = exports.includePhrase = exports.translationAttributes = exports.phraseAttributes = exports.lessonAttributes = exports.groupAttributes = exports.categoryAttributes = void 0;
const phrases_model_1 = __importDefault(require("../phrases/phrases.model"));
exports.categoryAttributes = [];
exports.groupAttributes = [];
exports.lessonAttributes = [];
exports.phraseAttributes = ['phraseId', 'text', 'color'];
exports.translationAttributes = [];
exports.includePhrase = {
    where: { grammar: null },
    model: phrases_model_1.default,
    as: 'phrases',
    attributes: exports.phraseAttributes
};
exports.orderPhrases = [{ model: phrases_model_1.default, as: 'phrases' }, 'sort', 'ASC'];
