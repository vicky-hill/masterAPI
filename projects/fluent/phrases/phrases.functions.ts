import { Phrase } from '../../../types/fluent/attribute.types'
import PhraseModel from './phrases.model'

export const getPhrases = async () => {
    const phraseInstances = await PhraseModel.findAll({
        where: {} 
    });

    const phrases = phraseInstances.map((phraseInstance) => {
        const phrase = phraseInstance.get({ plain: true });
        return { ...phrase };
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

export const updatePhrase = async (data: Phrase, phraseId: string) => {
    const phrase = await PhraseModel.update(data,
        { where: { phraseId } }
    );

    if (!phrase) throw new Error('Phrase not found');

    return phrase;
}

export const deletePhrase = async (phraseId: string) => {
    await PhraseModel.destroy({ where: { phraseId }});
    return { phraseId };
}