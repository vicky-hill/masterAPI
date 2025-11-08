import { Language } from '../../../types/fluent/attribute.types'
import { CreateLesson } from '../../../types/fluent/payload.types'
import { includePhrase, orderPhrases } from '../utils/include'
import LessonModel from './lessons.model'



export const getLessons = async (language?: Language, section?: number) => {
    const where: { language?: Language, section?: number } = {};

    if (language) where.language = language;
    if (section) where.section = section;

    const lessonInstances = await LessonModel.findAll({
        where,
        include: [includePhrase],
        order: [[['sort', 'ASC']], orderPhrases],
    });

    const lessons = lessonInstances.map((lessonInstance) => {
        const { sort, ...lesson } = lessonInstance.get({ plain: true });
        return lesson;
    })

    return lessons;
}

export const createLessons = async (data: CreateLesson[]) => {
    const lessons = await LessonModel.bulkCreate(data);
    return lessons;
}