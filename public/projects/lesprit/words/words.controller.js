"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importWords = exports.deleteWord = exports.updateWord = exports.getReview = exports.getWord = exports.getWords = exports.createWord = exports.getAllWords = void 0;
const Word = __importStar(require("./words.functions"));
const getAllWords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const words = yield Word.getAllWords();
        res.json(words);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllWords = getAllWords;
const createWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const word = yield Word.createWord(req.body, userId);
        res.json(word);
    }
    catch (err) {
        next(err);
    }
});
exports.createWord = createWord;
const getWords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { list } = req.query;
        const words = yield Word.getWords(userId, list);
        res.json(words);
    }
    catch (err) {
        next(err);
    }
});
exports.getWords = getWords;
const getWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wordId } = req.params;
        const word = yield Word.getWord(wordId);
        res.json(word);
    }
    catch (err) {
        next(err);
    }
});
exports.getWord = getWord;
const getReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const review = yield Word.getReview(userId);
        res.json(review);
    }
    catch (err) {
        next(err);
    }
});
exports.getReview = getReview;
const updateWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wordId } = req.params;
        const word = yield Word.updateWord(req.body, wordId);
        res.json(word);
    }
    catch (err) {
        next(err);
    }
});
exports.updateWord = updateWord;
const deleteWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wordId } = req.params;
        const word = yield Word.deleteWord(wordId);
        res.json(word);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteWord = deleteWord;
const importWords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const words = yield Word.importWords(userId);
        res.json(words);
    }
    catch (err) {
        console.log(err);
    }
});
exports.importWords = importWords;
