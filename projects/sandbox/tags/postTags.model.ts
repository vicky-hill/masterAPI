import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/sandbox.db.config'

export interface PostTag {
    id: number
    postId: number
    tagId: number
    status: string
}

class PostTagModel extends Model<InferAttributes<PostTagModel>, InferCreationAttributes<PostTagModel>> {
    declare id: CreationOptional<number>
    declare postId: number
    declare tagId: number
    declare status: string
}

const postTagSchema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
        type: Sequelize.INTEGER
    },
    tagId: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING
    }
}

PostTagModel.init(postTagSchema, {
  sequelize,
  modelName: "postTag",
  tableName: "postTags",
  timestamps: false
})

export default PostTagModel;
