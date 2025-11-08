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
exports.resetPhraseSort = exports.sortPhrases = exports.deletePhrase = exports.updatePhrase = exports.createPhrases = exports.createPhrase = exports.getPhrase = exports.getPhrases = void 0;
const Phrase = __importStar(require("./phrases.functions"));
const getPhrases = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phrases = yield Phrase.getPhrases();
        res.json(phrases);
    }
    catch (err) {
        next(err);
    }
});
exports.getPhrases = getPhrases;
const getPhrase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phraseId } = req.params;
        const phrase = yield Phrase.getPhrase(phraseId);
        res.json(phrase);
    }
    catch (err) {
        next(err);
    }
});
exports.getPhrase = getPhrase;
const createPhrase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phrase = yield Phrase.createPhrase(req.body);
        res.json(phrase);
    }
    catch (err) {
        next(err);
    }
});
exports.createPhrase = createPhrase;
const createPhrases = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phrase = yield Phrase.createPhrases(req.body);
        res.json(phrase);
    }
    catch (err) {
        next(err);
    }
});
exports.createPhrases = createPhrases;
const updatePhrase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phraseId } = req.params;
        const phrase = yield Phrase.updatePhrase(req.body, phraseId);
        res.json(phrase);
    }
    catch (err) {
        next(err);
    }
});
exports.updatePhrase = updatePhrase;
const deletePhrase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phraseId } = req.params;
        const phrase = yield Phrase.deletePhrase(phraseId);
        res.json(phrase);
    }
    catch (err) {
        next(err);
    }
});
exports.deletePhrase = deletePhrase;
const sortPhrases = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phrases = yield Phrase.sortPhrases(req.body);
        res.json(phrases);
    }
    catch (err) {
        next(err);
    }
});
exports.sortPhrases = sortPhrases;
const resetPhraseSort = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lessonId } = req.params;
        const phrases = yield Phrase.resetPhraseSort(Number(lessonId));
        res.json(phrases);
    }
    catch (err) {
        next(err);
    }
});
exports.resetPhraseSort = resetPhraseSort;
