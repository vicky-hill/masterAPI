import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Gender, Language } from '../../../types/fluent/attribute.types'

class TranslationModel extends Model<InferAttributes<TranslationModel>, InferCreationAttributes<TranslationModel>> {
  declare translationId: CreationOptional<number>
  declare language: Language
  declare gender: Gender
  declare wordId: number
  declare base: string
  declare masculineSingular: string
  declare masculinePlural: string
  declare feminineSingular: string
  declare femininePlural: string
}

const TranslationSchema = {
    translationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    language: {
        type: Sequelize.ENUM({ values: ['english', 'spanish', 'french', 'italian'] })
    },
    gender: {
        type: Sequelize.ENUM({ values: ['m', 'f'] })
    },
    wordId: {
        type: Sequelize.INTEGER
    },
    base: {
        type: Sequelize.STRING
    },
    masculineSingular: {
        type: Sequelize.STRING
    },
    masculinePlural: {
        type: Sequelize.STRING
    },
    feminineSingular: {
        type: Sequelize.STRING
    },
    femininePlural: {
        type: Sequelize.STRING
    }
}

TranslationModel.init(TranslationSchema, { 
  sequelize, 
  modelName: "Translation",
  tableName: "translations",
  timestamps: false
})


export default TranslationModel;