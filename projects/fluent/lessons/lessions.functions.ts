import PhraseModel from '../phrases/phrases.model'
import LessonModel from './lessons.model'


export const getLessons = async () => {
    const lessonInstances = await LessonModel.findAll({
        where: {},
        include: [{
            model: PhraseModel,
            as: 'phrases'
        }]
    });

    const lessons = lessonInstances.map((lessonInstance) => {
        const lesson = lessonInstance.get({ plain: true });
        return { ...lesson };
    })

    return lessons;
}