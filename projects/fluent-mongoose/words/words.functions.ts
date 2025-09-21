import { Word } from '../../../types/fluent-mongoose/attribute.types'
import { CreateWord } from '../../../types/fluent-mongoose/payload.types'
import WordModel from './words.model'

export const getWords = async (language: string) => {
    const wordInstances = await WordModel.find({ 
        [language]: { $exists: true, $ne: "" } 
    }).populate('image').lean();

    const words = wordInstances.map((wordInstance: any) => ({
        _id: wordInstance._id,
        english: wordInstance.english,
        target: wordInstance[language],
        image: wordInstance.image
    }))

    return words as Word[];
}

export const createWord = async (data: CreateWord) => {
    const wordInstance = await WordModel.create({ ...data });
    const word = wordInstance.toObject();

    return word as Word;
}