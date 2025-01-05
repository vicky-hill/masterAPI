import { CreateWord, UpdateWord } from '../../../types/lesprit/payload.types'
import throwError from '../../../utils/throwError';
import Word from './words.model'


export const createWord = async (data: CreateWord, userId: string) => {
    const newWord = await Word.create({ ...data, user: userId });

    const word = await Word.findById(newWord._id).populate({
        path: 'list',
        select: 'title'
    });

    return word;
}

export const getWords = async (userId: string) => {
    const words = await Word.find({ user: userId }).populate({
        path: 'list',
        select: 'title'
    }).sort({ createdAt: -1 });

    return words;
}

export const getWord = async (wordId: string) => {
    const word = await Word.findById(wordId);

    if(!word) throwError('Word not found');

    return word;
}

export const getReview = async (userId: string) => {
    const review = await Word.find({ dueDate: { $lte: Date.now() }, user: userId });

    return review;
}

export const updateWord = async (data: UpdateWord, wordId: string) => {
    const updateWord = await Word.findByIdAndUpdate(wordId, data, {new: true});

    if(!updateWord) return throwError('Word not found');

    const word = await Word.findById(updateWord._id).populate({
        path: 'list',
        select: 'title'
    });

    return word;
}

export const deleteWord = async (wordId: string) => {
    const word = await Word.findByIdAndDelete(wordId);

    if(!word) throwError('Word not found');

    return word;
}