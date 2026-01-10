import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/sandbox.db.config'

export interface Tag {
    tagId: number
    name: string
}

class TagModel extends Model<InferAttributes<TagModel>, InferCreationAttributes<TagModel>> {
    declare tagId: CreationOptional<number>
    declare name: string
}

const tagSchema = {
    tagId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
}

TagModel.init(tagSchema, {
  sequelize,
  modelName: "tag",
  tableName: "tags",
  timestamps: false
})

export default TagModel;
