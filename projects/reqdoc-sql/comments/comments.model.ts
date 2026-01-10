import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'

export interface Comment {
    commentId: number
    userId: string
    text: string
    edited: boolean
}

class CommentModel extends Model<InferAttributes<CommentModel>, InferCreationAttributes<CommentModel>> {
    declare commentId: CreationOptional<number>
    declare edited: CreationOptional<boolean>
    declare userId: string
    declare reqId: number
    declare text: string
}

const commentSchema = {
    commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reqId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edited: {
        type: Sequelize.STRING,
        defaultValue: false
    }
}

CommentModel.init(commentSchema, {
    sequelize,
    modelName: "comment",
    tableName: "comments",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
})

export default CommentModel;
