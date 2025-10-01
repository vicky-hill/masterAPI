import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize';
import sequelize from '../../../config/fluent.db.config'
import { Difficulty, Translation, Type } from '../../../types/fluent/attribute.types'
import TranslationModel from '../translations/translations.model'


class WordModel extends Model<InferAttributes<WordModel>, InferCreationAttributes<WordModel>> {
  declare wordId: CreationOptional<number>
  declare groupId: number
  declare categoryId: number
  declare type: Type
  declare difficulty: Difficulty
  declare base: string
  declare sort: number

  declare translations?: Translation[]

  declare spanish?: Translation
  declare french?: Translation
  declare italian?: Translation

  declare static associations: {
    translations: Association<WordModel, TranslationModel>
  }
}

const wordSchema = {
  wordId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupId: {
    type: Sequelize.INTEGER
  },
  categoryId: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.ENUM({ values: ['adjective', 'noun', 'verb', 'adverb'] }),
  },
  difficulty: {
    type: Sequelize.ENUM({ values: ['beginner', 'intermediate', 'advanced', 'expert'] }),
  },
  base: {
    type: Sequelize.STRING,
  },
  sort: {
    type: Sequelize.INTEGER,
  }
}

WordModel.init(wordSchema, {
  sequelize,
  modelName: "Word",
  tableName: "words",
  timestamps: false
})

WordModel.hasMany(TranslationModel, {
  foreignKey: "wordId",
  as: 'translations'
});


export default WordModel;
