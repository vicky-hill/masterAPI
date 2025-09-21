import Sequelize, { Model, ModelStatic } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { GroupAttributes } from '../../../types/fluent/attribute.types'
import WordModel from '../words/words.model'
import CategoryModel from '../categories/categories.model'

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

const GroupModel: ModelStatic<Model<GroupAttributes>> = sequelize.define('groups', groupSchema, {
  timestamps: false,
  freezeTableName: true,
})

GroupModel.hasMany(WordModel, {
  foreignKey: "groupId",
  as: 'words'
});

GroupModel.hasMany(CategoryModel, {
  foreignKey: "categoryId",
  as: 'categories'
});


export default GroupModel;