import { LessonAttributes } from '../../../types/fluent/attribute.types'
import LessonModel from './lessons.model'
import { Model } from 'sequelize'


export const getLessons = async () => {
    const lessonInstances = await LessonModel.findAll({
        where: {} 
    });

    const lessons = lessonInstances.map((lessonInstance) => {
        const lesson = lessonInstance.get({ plain: true });
        return { ...lesson };
    })

    return lessons;
}