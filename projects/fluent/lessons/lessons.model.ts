import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Language, Phrase } from '../../../types/fluent/attribute.types'
import PhraseModel from '../phrases/phrases.model'

class LessonModel extends Model<InferAttributes<LessonModel>, InferCreationAttributes<LessonModel>> {
    declare lessonId: CreationOptional<number>
    declare section: number
    declare title: string
    declare language: Language
    declare sort: number

    declare phrases?: Phrase[]

    declare static associations: {
        phrase: Association<LessonModel, PhraseModel>
    }
}

const LessonSchema = {
    lessonId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    section: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    language: {
        type: Sequelize.ENUM({ values: ['spanish', 'french', 'italian'] })
    },
    sort: {
        type: Sequelize.INTEGER
    }
}

LessonModel.init(LessonSchema, {
    sequelize,
    modelName: "Lesson",
    tableName: "lessons",
    timestamps: false
})

LessonModel.hasMany(PhraseModel, {
    foreignKey: "lessonId",
    as: 'phrases'
});


export default LessonModel;