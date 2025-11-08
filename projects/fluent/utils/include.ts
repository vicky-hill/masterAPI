import PhraseModel from '../phrases/phrases.model'

export const categoryAttributes = [];
export const groupAttributes = [];
export const lessonAttributes = [];
export const phraseAttributes = ['phraseId', 'text', 'color'];
export const translationAttributes = [];

export const includePhrase = {
    where: { grammar: null },
    model: PhraseModel,
    as: 'phrases',
    attributes: phraseAttributes
}

export const orderPhrases: any = [{ model: PhraseModel, as: 'phrases' }, 'sort', 'ASC'];