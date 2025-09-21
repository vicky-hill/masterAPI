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

exports.getNeatGroups = exports.getAllGroups = void 0;
const words_model_1 = __importDefault(require("../words/words.model"));
const groups_model_1 = __importDefault(require("./groups.model"));
const translations_model_1 = __importDefault(require("../translations/translations.model"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
const getAllGroups = (language) => __awaiter(void 0, void 0, void 0, function* () {
    const group_where = {};
    const translation_where = {};
    if (language) {
        translation_where.language = language;
    }
    const groups = yield groups_model_1.default.findAll({
        include: [{
                model: categories_model_1.default,
                as: 'categories',
                include: [{
                        model: words_model_1.default,
                        as: 'words',
                        include: [{
                                model: translations_model_1.default,
                                as: 'translations',
                                where: translation_where
                            }]
                    }]
            }, {
                model: words_model_1.default,
                as: 'words',
                include: [{
                        model: translations_model_1.default,
                        as: 'translations',
                        where: translation_where
                    }]
            }]
    });
    if (language) {
        return groups
            .map(groupInstance => {
            const group = groupInstance.get({ plain: true });
            const words = group.words || [];
            return {
                groupId: group.groupId,
                name: group.name,
                words: words
                    .filter(words => { var _a; return (_a = words.translations) === null || _a === void 0 ? void 0 : _a.length; })
                    .map(words => words.translations)
            };
        });
    }
    return groups.map(groupInstance => {
        var _a;
        const group = groupInstance.get({ plain: true });
        (_a = group.categories) === null || _a === void 0 ? void 0 : _a.forEach(category => {
            var _a;
            (_a = category.words) === null || _a === void 0 ? void 0 : _a.forEach((word) => {
                var _a;
                (_a = word.translations) === null || _a === void 0 ? void 0 : _a.forEach((translation) => (word[translation.language] = translation));
            });
        });
        return group;
    });
});
exports.getAllGroups = getAllGroups;
const getNeatGroups = (language) => __awaiter(void 0, void 0, void 0, function* () {
    const translation_where = {};
    if (language) {
        translation_where.language = language;
    }
    const groups = yield groups_model_1.default.findAll({
        include: [{
                model: words_model_1.default,
                as: 'words',
                order: [['sort', 'ASC']],
                include: [{
                        model: translations_model_1.default,
                        as: 'translations',
                        where: translation_where
                    }]
            }]
    });
    if (language) {
        return groups
            .map(groupInstance => {
            const group = groupInstance.get({ plain: true });
            const words = group.words || [];
            const baseWords = words
                .filter(words => { var _a; return (_a = words.translations) === null || _a === void 0 ? void 0 : _a.length; })
                .map(words => words.translations).flat()
                .map(translation => translation === null || translation === void 0 ? void 0 : translation.base);
            return {
                groupId: group.groupId,
                name: group.name,
                language,
                words: baseWords,
                wordsWithVariations: words
                    .filter(word => { var _a; return (_a = word.translations) === null || _a === void 0 ? void 0 : _a.length; })
                    .map(word => {
                    if (word.translations) {
                        const translation = word.translations[0];
                        return `${translation.masculineSingular}, ${translation.masculinePlural}, ${translation.feminineSingular}, ${translation.femininePlural}`;
                    }
                }),
            };
        });
    }
});
exports.getNeatGroups = getNeatGroups;
