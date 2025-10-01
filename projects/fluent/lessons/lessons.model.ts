import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Language } from '../../../types/fluent/attribute.types'

class LessonModel extends Model<InferAttributes<LessonModel>, InferCreationAttributes<LessonModel>> {
  declare lessonId: CreationOptional<number>
  declare section: number
  declare title: string
  declare language: Language
  declare sort: number
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


export default LessonModel;