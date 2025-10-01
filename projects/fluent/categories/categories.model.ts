import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute, Association } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Word } from '../../../types/fluent/attribute.types'
import WordModel from '../words/words.model'

class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
  declare categoryId: CreationOptional<number>
  declare groupId: number
  declare name: string
  declare sort: number

  declare words?: Word[]

  declare static associations: {
    words: Association<CategoryModel, WordModel>
  }
}

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

CategoryModel.init(categorySchema, { 
  sequelize, 
  modelName: "Category",
  tableName: "categories",
  timestamps: false
})

CategoryModel.hasMany(WordModel, {
  foreignKey: "categoryId",
  as: 'words'
});


export default CategoryModel;
