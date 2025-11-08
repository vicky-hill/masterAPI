import TranslationModel from '../translations/translations.model'
import WordModel from './words.model'

export const getAllWords = async (language?: string) => {
    const word_where: any = {};
    const translation_where: any = {};

    if (language) {
        translation_where.language = language;
    }

    const words = await WordModel.findAll({
        include: [{
            model: TranslationModel,
            as: 'translations',
            where: translation_where
        }]
    });

    if (language) {
        return words
            .filter(wordInstance => wordInstance.getDataValue('translations')?.length)
            .map(wordInstance => {
                const word = wordInstance.get({ plain: true });

                if (word.translations) {
                    const translation = word.translations[0]

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
                    }
                }
            })
    }


    return words;
}

export const createAdjectives = async (data: any) => {
    const allWords = await WordModel.count();

    let count = allWords;
    let createdWords = [];
    let createdTranslations = [];

    for (let i = 0; i < data.length; i++) {
        const wordData = data[i];

        const existingWord = await WordModel.findOne({ where: { base: wordData.english } });
        let wordId;

        if (existingWord) {
            wordId = existingWord.getDataValue('wordId');

        } else {
            const createdWord = await WordModel.create({
                groupId: 1,
                categoryId: wordData.categoryId,
                type: 'adjective',
                base: wordData.english,
                difficulty: 'beginner',
                sort: count + 1
            })

            createdWords.push(createdWord);

            wordId = createdWord.getDataValue('wordId');
        }

        const translations = wordData.translations.map((translation: any) => {
            const variations = translation.word.split(',');

            return {
                wordId,
                language: translation.language,
                base: variations[0],
                masculineSingular: variations[0],
                masculinePlural: variations[1],
                feminineSingular: variations[2],
                femininePlural: variations[3],
            }
        })

        const translationBaseWords = translations.map((translation: any) => translation.base);

        const existingTranslations = await TranslationModel.findAll({
            where: { base: translationBaseWords }
        })

        const existingTranslationBaseWords = existingTranslations.map(translationInstance => (
            translationInstance.getDataValue('base')
        ))

        const uniqueTranslations = translations.filter((translation: any) => !existingTranslationBaseWords.includes(translation.base))

        const createdTranslation = await TranslationModel.bulkCreate(uniqueTranslations);

        createdTranslations.push(createdTranslation);

        count = count + 1;
    }

    return {
        createdWords,
        createdTranslations
    }
}

export const createWords = async (data: any) => {
    const allWords = await WordModel.count();
    let count = allWords;
    let createdWords = [];
    let createdTranslations = [];

    for (let i = 0; i < data.length; i++) {
        const wordData = data[i];

        const existingWord = await WordModel.findOne({ where: { base: wordData.english } });
        let wordId;

        if (existingWord) {
            wordId = existingWord.getDataValue('wordId');

        } else {
            const createdWord = await WordModel.create({
                groupId: wordData.groupId,
                categoryId: wordData.categoryId,
                type: wordData.type,
                base: wordData.english,
                difficulty: 'beginner',
                sort: count + 1
            })

            createdWords.push(createdWord);

            wordId = createdWord.getDataValue('wordId');
        }

        const translations = wordData.translations.map((translation: any) => {
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
                }
            }

            return {
                wordId,
                language: translation.language,
                base: translation.word,
                gender: translation.gender
            }
        })

        const translationBaseWords = translations.map((translation: any) => translation.base);

        const existingTranslations = await TranslationModel.findAll({
            where: { base: translationBaseWords }
        })

        const existingTranslationBaseWords = existingTranslations.map(translationInstance => (
            translationInstance.getDataValue('base')
        ))

        const uniqueTranslations = translations.filter((translation: any) => !existingTranslationBaseWords.includes(translation.base))

        const createdTranslation = await TranslationModel.bulkCreate(uniqueTranslations);


        createdTranslations.push(createdTranslation);

        count = count + 1;
    }

     return {
        createdWords,
        createdTranslations
    }
}