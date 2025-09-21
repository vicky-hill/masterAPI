import Sequelize, { Model, ModelStatic } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import WordModel from '../words/words.model'
import { CategoryAttributes } from '../../../types/fluent/attribute.types'

const categorySchema = {
  categoryId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupId: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  sort: {
    type: Sequelize.INTEGER,
  },
}

const CategoryModel: ModelStatic<Model<CategoryAttributes>> = sequelize.define('categories', categorySchema, {
  timestamps: false,
  freezeTableName: true,
})

CategoryModel.hasMany(WordModel, {
  foreignKey: "categoryId",
  as: 'words'
});


export default CategoryModel;
