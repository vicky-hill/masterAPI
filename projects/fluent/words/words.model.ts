import Sequelize, { Model, ModelStatic } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { WordAttributes } from '../../../types/fluent/attribute.types'
import TranslationModel from '../translations/translations.model'

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

const WordModel: ModelStatic<Model<WordAttributes>> = sequelize.define('words', wordSchema, {
  timestamps: false,
  freezeTableName: true,
})

WordModel.hasMany(TranslationModel, {
  foreignKey: "wordId",
  as: 'translations'
});


export default WordModel;
