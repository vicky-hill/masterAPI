import WordModel from '../words/words.model'
import GroupModel from './groups.model'
import TranslationModel from '../translations/translations.model'
import CategoryModel from '../categories/categories.model';

export const getAllGroups = async (language?: string) => {
    const group_where: any = {};
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

    if (language) {
        return groups
            .map(groupInstance => {
                const group = groupInstance.get({ plain: true });
                const words = group.words || [];

                return {
                    groupId: group.groupId,
                    name: group.name,
                    words: words
                        .filter(words => words.translations?.length)
                        .map(words => words.translations)
                }
            })
    }

    //     return groups.map(groupInstance => {
    //         const group = groupInstance.get({ plain: true });
    // 
    //         group.categories?.forEach(category => {
    //             category.words?.forEach((word: any) => {
    //                 word.translations?.forEach((translation: any) => (
    //                     word[translation.language] = translation
    //                 ))
    //             })
    //         })
    //       
    //         return group;
    //     })

    return groups
}

export const getNeatGroups = async (language?: string) => {
    const translation_where: any = {};

    if (language) {
        translation_where.language = language;
    }

    const groups = await GroupModel.findAll({
        include: [{
            model: WordModel,
            as: 'words',
            order: [['sort', 'ASC']],
            include: [{
                model: TranslationModel,
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
                    .filter(words => words.translations?.length)
                    .map(words => words.translations).flat()
                    .map(translation => translation?.base)

                return {
                    groupId: group.groupId,
                    name: group.name,
                    language,
                    words: baseWords,
                    wordsWithVariations: words
                        .filter(word => word.translations?.length)
                        .map(word => {
                            if (word.translations) {
                                const translation = word.translations[0];

                                return `${translation.masculineSingular}, ${translation.masculinePlural}, ${translation.feminineSingular}, ${translation.femininePlural}`
                            }
                        }),
                }
            })
    }
}