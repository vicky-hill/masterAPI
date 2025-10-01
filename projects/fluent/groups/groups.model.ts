import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Word, CategoryAttributes } from '../../../types/fluent/attribute.types'
import CategoryModel from '../categories/categories.model'
import WordModel from '../words/words.model'


class GroupModel extends Model<InferAttributes<GroupModel>, InferCreationAttributes<GroupModel>> {
  declare groupId: CreationOptional<number>
  declare name: string

  declare words?: Word[]
  declare categories?: CategoryAttributes[]
 
  declare wordsByLanguage?: {
    french: string[]
    spanish: string[]
    italian: string[]
  }
  
  declare static associations: {
    words: Association<GroupModel, WordModel>
    categories: Association<GroupModel, CategoryModel>
  }
}

const groupSchema = {
  groupId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  }
}

GroupModel.init(groupSchema, { 
  sequelize, 
  modelName: "Group",
  tableName: "groups",
  timestamps: false
})

GroupModel.hasMany(WordModel, {
  foreignKey: "groupId",
  as: 'words'
});

GroupModel.hasMany(CategoryModel, {
  foreignKey: "groupId",
  as: 'categories'
});


export default GroupModel;