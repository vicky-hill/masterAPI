import { Color, Phrase } from '../../../types/fluent/attribute.types'
import { CreatePhrase } from '../../../types/fluent/payload.types'
import { colors, getRandomColor } from '../utils/colors'
import { phraseAttributes } from '../utils/include'
import PhraseModel from './phrases.model'


export const getPhrases = async () => {
    const phraseInstances = await PhraseModel.findAll({
        where: {}
    });

    const phrases = phraseInstances.map((phraseInstance) => {
        const { sort, originalSort, ...phrases } = phraseInstance.get({ plain: true });
        return phrases;
    })

    return phrases;
}

export const getPhrase = async (phraseId: string): Promise<any> => {
    const phraseInstance = await PhraseModel.findOne({
        where: { phraseId }
    });

    if (!phraseInstance) throw new Error('Phrase not found');

    const phrase = phraseInstance.get({ plain: true });

    return phrase;
}

export const createPhrase = async (data: Phrase) => {
    const phrase = await PhraseModel.create(data);

    return phrase;
}

export const createPhrases = async (data: CreatePhrase) => {
    const phrases: Phrase[] = [];
    const availableColors = [...colors];

    let pairColor: Color | null = null;

    const phraseCount = await PhraseModel.count({
        where: { lessonId: data.lessonId }
    })

    data.phrases.forEach((text, i) => {
        const phrase: Phrase = {
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
            } else {
                const color = getRandomColor(availableColors);
                availableColors.splice(color.index, 1);
                pairColor = color.name;
                phrase.color = color.name;
            }

            phrase.text = text.replace('*', '');
            phrase.pair = true;
        }

        phrases.push(phrase);
    });

    await PhraseModel.bulkCreate(phrases);

    return phrases;
}

export const updatePhrase = async (data: Phrase, phraseId: string) => {
    await PhraseModel.update(data,
        { where: { phraseId } }
    );

    const phrase = await PhraseModel.findByPk(phraseId);

    if (!phrase) throw new Error('Phrase not found');

    return phrase;
}

export const deletePhrase = async (phraseId: string) => {
    await PhraseModel.destroy({ where: { phraseId } });
    return { phraseId };
}

export const resetPhraseSort = async (lessonId: number) => {
    const phrases = await PhraseModel.findAll({
        where: { lessonId }
    });

    await Promise.all(phrases.map(({ phraseId, originalSort }) => {
        PhraseModel.update(
            { sort: originalSort },
            { where: { phraseId } }
        )
    }));

    const restoredPhrases = await PhraseModel.findAll({
        where: { lessonId },
        order: [['sort', 'ASC']],
        attributes: phraseAttributes
    })

    return restoredPhrases;
}

export const sortPhrases = async (data: { phraseId: number, sort: number }[]) => {
    await Promise.all(data.map(({ phraseId, sort }) => {
        PhraseModel.update(
            { sort },
            { where: { phraseId } }
        )
    }));

    return data;
}