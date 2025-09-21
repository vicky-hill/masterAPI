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
exports.getAllWords = void 0;
const translations_model_1 = __importDefault(require("../translations/translations.model"));
const words_model_1 = __importDefault(require("./words.model"));
const getAllWords = (language) => __awaiter(void 0, void 0, void 0, function* () {
    const word_where = {};
    const translation_where = {};
    if (language) {
        translation_where.language = language;
    }
    const words = yield words_model_1.default.findAll({
        include: [{
                model: translations_model_1.default,
                as: 'translations',
                where: translation_where
            }]
    });
    if (language) {
        return words
            .filter(wordInstance => wordInstance.getDataValue('translations').length)
            .map(wordInstance => {
            const word = wordInstance.get({ plain: true });
            const translation = word.translations[0];
            return {
                wordId: word.wordId,
                type: word.type,
                base: word.base,
                translation: translation.base,
                forms: [
                    { gender: 'masculine', form: 'singular', word: translation.masculineSingular },
                    { gender: 'masculine', form: 'plural', word: translation.masculinePlural },
                    { gender: 'feminine', form: 'singular', word: translation.feminineSingular },
                    { gender: 'feminine', form: 'plural', word: translation.femininePlural },
                ]
            };
        });
    }
    return words;
});
exports.getAllWords = getAllWords;
