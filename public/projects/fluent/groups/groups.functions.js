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
exports.getAllGroups = void 0;
const words_model_1 = __importDefault(require("../words/words.model"));
const groups_model_1 = __importDefault(require("./groups.model"));
const translations_model_1 = __importDefault(require("../translations/translations.model"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
const utils_1 = require("../utils");
const getAllGroups = (language) => __awaiter(void 0, void 0, void 0, function* () {
    const translation_where = {};
    // const cacheKey = `groups:all`;
    // const cached = await getValue(cacheKey);
    // if (cached && !language) return cached;
    if (language) {
        translation_where.language = language;
    }
    const groupInstances = yield groups_model_1.default.findAll({
        include: [{
                model: categories_model_1.default,
                as: 'categories',
                separate: true,
                include: [{
                        model: words_model_1.default,
                        as: 'words',
                        separate: true,
                        include: [{
                                model: translations_model_1.default,
                                as: 'translations',
                                where: translation_where
                            }]
                    }]
            }, {
                model: words_model_1.default,
                as: 'words',
                separate: true,
                include: [{
                        model: translations_model_1.default,
                        as: 'translations',
                        where: translation_where,
                        separate: true
                    }]
            }]
    });
    const groups = groupInstances.map(groupInstance => {
        var _a;
        const group = groupInstance.get({ plain: true });
        const words = group.words || [];
        (_a = group.categories) === null || _a === void 0 ? void 0 : _a.forEach((category) => {
            var _a;
            (_a = category.words) === null || _a === void 0 ? void 0 : _a.forEach((word) => {
                var _a;
                (_a = word.translations) === null || _a === void 0 ? void 0 : _a.forEach((translation) => (word[translation.language] = translation));
            });
        });
        group.wordsByLanguage = {
            spanish: (0, utils_1.getWordsByLanguage)(words, 'spanish'),
            french: (0, utils_1.getWordsByLanguage)(words, 'french'),
            italian: (0, utils_1.getWordsByLanguage)(words, 'italian')
        };
        return group;
    });
    // await setValue(cacheKey, groups);
    return groups;
});
exports.getAllGroups = getAllGroups;
