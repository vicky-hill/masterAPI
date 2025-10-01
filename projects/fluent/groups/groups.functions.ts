import WordModel from '../words/words.model'
import GroupModel from './groups.model'
import TranslationModel from '../translations/translations.model'
import CategoryModel from '../categories/categories.model'
import { getWordsByLanguage } from '../utils'

export const getAllGroups = async (language?: string) => {
    const translation_where: any = {};

    if (language) {
        translation_where.language = language;
    }

    const groups = await GroupModel.findAll({
        include: [{
            model: CategoryModel,
            as: 'categories',
            include: [{
                model: WordModel,
                as: 'words',
                include: [{
                    model: TranslationModel,
                    as: 'translations',
                    where: translation_where
                }]
            }]
        }, {
            model: WordModel,
            as: 'words',
            include: [{
                model: TranslationModel,
                as: 'translations',
                where: translation_where
            }]
        }]
    });

    return groups.map(groupInstance => {
        const group = groupInstance.get({ plain: true });
        const words = group.words || [];

        group.categories?.forEach((category) => {
            category.words?.forEach((word: any) => {
                word.translations?.forEach((translation: any) => (
                    word[translation.language] = translation
                ))
            })
        })

        group.wordsByLanguage = {
            spanish: getWordsByLanguage(words, 'spanish'),
            french: getWordsByLanguage(words, 'french'),
            italian: getWordsByLanguage(words, 'italian')
        }

        return group;
    })
}