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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortPhrases = exports.resetPhraseSort = exports.deletePhrase = exports.updatePhrase = exports.createPhrases = exports.createPhrase = exports.getPhrase = exports.getPhrases = void 0;
const colors_1 = require("../utils/colors");
const include_1 = require("../utils/include");
const phrases_model_1 = __importDefault(require("./phrases.model"));
const getPhrases = () => __awaiter(void 0, void 0, void 0, function* () {
    const phraseInstances = yield phrases_model_1.default.findAll({
        where: {}
    });
    const phrases = phraseInstances.map((phraseInstance) => {
        const _a = phraseInstance.get({ plain: true }), { sort, originalSort } = _a, phrases = __rest(_a, ["sort", "originalSort"]);
        return phrases;
    });
    return phrases;
});
exports.getPhrases = getPhrases;
const getPhrase = (phraseId) => __awaiter(void 0, void 0, void 0, function* () {
    const phraseInstance = yield phrases_model_1.default.findOne({
        where: { phraseId }
    });
    if (!phraseInstance)
        throw new Error('Phrase not found');
    const phrase = phraseInstance.get({ plain: true });
    return phrase;
});
exports.getPhrase = getPhrase;
const createPhrase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const phrase = yield phrases_model_1.default.create(data);
    return phrase;
});
exports.createPhrase = createPhrase;
const createPhrases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const phrases = [];
    const availableColors = [...colors_1.colors];
    let pairColor = null;
    const phraseCount = yield phrases_model_1.default.count({
        where: { lessonId: data.lessonId }
    });
    data.phrases.forEach((text, i) => {
        const phrase = {
            lessonId: data.lessonId,
            text: text,
            sort: phraseCount + i,
            originalSort: phraseCount + i,
            color: null
        };
        if (text.startsWith("*")) {
            if (pairColor) {
                phrase.color = pairColor;
                pairColor = null;
            }
            else {
                const color = (0, colors_1.getRandomColor)(availableColors);
                availableColors.splice(color.index, 1);
                pairColor = color.name;
                phrase.color = color.name;
            }
            phrase.text = text.replace('*', '');
            phrase.pair = true;
        }
        phrases.push(phrase);
    });
    yield phrases_model_1.default.bulkCreate(phrases);
    return phrases;
});
exports.createPhrases = createPhrases;
const updatePhrase = (data, phraseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield phrases_model_1.default.update(data, { where: { phraseId } });
    const phrase = yield phrases_model_1.default.findByPk(phraseId);
    if (!phrase)
        throw new Error('Phrase not found');
    return phrase;
});
exports.updatePhrase = updatePhrase;
const deletePhrase = (phraseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield phrases_model_1.default.destroy({ where: { phraseId } });
    return { phraseId };
});
exports.deletePhrase = deletePhrase;
const resetPhraseSort = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    const phrases = yield phrases_model_1.default.findAll({
        where: { lessonId }
    });
    yield Promise.all(phrases.map(({ phraseId, originalSort }) => {
        phrases_model_1.default.update({ sort: originalSort }, { where: { phraseId } });
    }));
    const restoredPhrases = yield phrases_model_1.default.findAll({
        where: { lessonId },
        order: [['sort', 'ASC']],
        attributes: include_1.phraseAttributes
    });
    return restoredPhrases;
});
exports.resetPhraseSort = resetPhraseSort;
const sortPhrases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(data.map(({ phraseId, sort }) => {
        phrases_model_1.default.update({ sort }, { where: { phraseId } });
    }));
    return data;
});
exports.sortPhrases = sortPhrases;
