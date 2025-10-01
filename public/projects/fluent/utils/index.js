"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWordsByLanguage = getWordsByLanguage;
function getWordsByLanguage(words, language) {
    if (!(words === null || words === void 0 ? void 0 : words.length))
        return [];
    return words
        .map((word) => word.translations || []).flat()
        .filter(translation => translation.language === language)
        .map(translation => translation.base);
}
