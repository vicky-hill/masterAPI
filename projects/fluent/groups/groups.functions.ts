import WordModel from '../words/words.model'
import GroupModel from './groups.model'
import TranslationModel from '../translations/translations.model'
import CategoryModel from '../categories/categories.model'
import { getWordsByLanguage } from '../utils'
import { getValue, setValue } from '../../../utils/redis'



export const getAllGroups = async (language?: string) => {
    const translation_where: any = {};

    const cacheKey = `groups:all`;
    const cached = await getValue(cacheKey);
    if (cached && !language) return cached;


    if (language) {
        translation_where.language = language;
    }

    const groupInstances = await GroupModel.findAll({
        include: [{
            model: CategoryModel,
            as: 'categories',
            separate: true,
            include: [{
                model: WordModel,
                as: 'words',
                separate: true,
                include: [{
                    model: TranslationModel,
                    as: 'translations',
                    where: translation_where
                }]
            }]
        }, {
            model: WordModel,
            as: 'words',
            separate: true,
            include: [{
                model: TranslationModel,
                as: 'translations',
                where: translation_where,
                separate: true
            }]
        }]
    });

    const groups = groupInstances.map(groupInstance => {
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

    await setValue(cacheKey, groups);

    return groups;
}