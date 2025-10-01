import { Language, Word } from '../../../types/fluent/attribute.types'

export function getWordsByLanguage(words: Word[], language: Language) {
    if (!words?.length) return [];

    return words
        .map((word) => word.translations || []).flat()
        .filter(translation => translation.language === language)
        .map(translation => translation.base)
}