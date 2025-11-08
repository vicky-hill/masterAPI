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
exports.createWords = exports.createAdjectives = exports.getAllWords = void 0;
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
            .filter(wordInstance => { var _a; return (_a = wordInstance.getDataValue('translations')) === null || _a === void 0 ? void 0 : _a.length; })
            .map(wordInstance => {
            const word = wordInstance.get({ plain: true });
            if (word.translations) {
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
            }
        });
    }
    return words;
});
exports.getAllWords = getAllWords;
const createAdjectives = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const allWords = yield words_model_1.default.count();
    let count = allWords;
    let createdWords = [];
    let createdTranslations = [];
    for (let i = 0; i < data.length; i++) {
        const wordData = data[i];
        const existingWord = yield words_model_1.default.findOne({ where: { base: wordData.english } });
        let wordId;
        if (existingWord) {
            wordId = existingWord.getDataValue('wordId');
        }
        else {
            const createdWord = yield words_model_1.default.create({
                groupId: 1,
                categoryId: wordData.categoryId,
                type: 'adjective',
                base: wordData.english,
                difficulty: 'beginner',
                sort: count + 1
            });
            createdWords.push(createdWord);
            wordId = createdWord.getDataValue('wordId');
        }
        const translations = wordData.translations.map((translation) => {
            const variations = translation.word.split(',');
            return {
                wordId,
                language: translation.language,
                base: variations[0],
                masculineSingular: variations[0],
                masculinePlural: variations[1],
                feminineSingular: variations[2],
                femininePlural: variations[3],
            };
        });
        const translationBaseWords = translations.map((translation) => translation.base);
        const existingTranslations = yield translations_model_1.default.findAll({
            where: { base: translationBaseWords }
        });
        const existingTranslationBaseWords = existingTranslations.map(translationInstance => (translationInstance.getDataValue('base')));
        const uniqueTranslations = translations.filter((translation) => !existingTranslationBaseWords.includes(translation.base));
        const createdTranslation = yield translations_model_1.default.bulkCreate(uniqueTranslations);
        createdTranslations.push(createdTranslation);
        count = count + 1;
    }
    return {
        createdWords,
        createdTranslations
    };
});
exports.createAdjectives = createAdjectives;
const createWords = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const allWords = yield words_model_1.default.count();
    let count = allWords;
    let createdWords = [];
    let createdTranslations = [];
    for (let i = 0; i < data.length; i++) {
        const wordData = data[i];
        const existingWord = yield words_model_1.default.findOne({ where: { base: wordData.english } });
        let wordId;
        if (existingWord) {
            wordId = existingWord.getDataValue('wordId');
        }
        else {
            const createdWord = yield words_model_1.default.create({
                groupId: wordData.groupId,
                categoryId: wordData.categoryId,
                type: wordData.type,
                base: wordData.english,
                difficulty: 'beginner',
                sort: count + 1
            });
            createdWords.push(createdWord);
            wordId = createdWord.getDataValue('wordId');
        }
        const translations = wordData.translations.map((translation) => {
            if (wordData.type === 'adjective') {
                const variations = translation.word.split(',');
                return {
                    wordId,
                    language: translation.language,
                    base: variations[0],
                    masculineSingular: variations[0],
                    masculinePlural: variations[1],
                    feminineSingular: variations[2],
                    femininePlural: variations[3],
                };
            }
            return {
                wordId,
                language: translation.language,
                base: translation.word,
                gender: translation.gender
            };
        });
        const translationBaseWords = translations.map((translation) => translation.base);
        const existingTranslations = yield translations_model_1.default.findAll({
            where: { base: translationBaseWords }
        });
        const existingTranslationBaseWords = existingTranslations.map(translationInstance => (translationInstance.getDataValue('base')));
        const uniqueTranslations = translations.filter((translation) => !existingTranslationBaseWords.includes(translation.base));
        const createdTranslation = yield translations_model_1.default.bulkCreate(uniqueTranslations);
        createdTranslations.push(createdTranslation);
        count = count + 1;
    }
    return {
        createdWords,
        createdTranslations
    };
});
exports.createWords = createWords;
