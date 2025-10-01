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
exports.deletePhrase = exports.updatePhrase = exports.createPhrase = exports.getPhrase = exports.getPhrases = void 0;
const phrases_model_1 = __importDefault(require("./phrases.model"));
const getPhrases = () => __awaiter(void 0, void 0, void 0, function* () {
    const phraseInstances = yield phrases_model_1.default.findAll({
        where: {}
    });
    const phrases = phraseInstances.map((phraseInstance) => {
        const phrase = phraseInstance.get({ plain: true });
        return Object.assign({}, phrase);
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
const updatePhrase = (data, phraseId) => __awaiter(void 0, void 0, void 0, function* () {
    const phrase = yield phrases_model_1.default.update(data, { where: { phraseId } });
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
