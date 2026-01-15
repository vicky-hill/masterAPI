import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'


class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    declare commentId: CreationOptional<number>
    declare edited: CreationOptional<boolean>
    declare userId: string
    declare reqId: number
    declare text: string

    static async checkAccess(commentId: string | number, userId: string) {
        const comment = await this.findByPk(commentId, {
            rejectOnEmpty: new Error('Comment not found')
        })

        if (comment.userId !== userId) {
            throw new Error('Not authorized to edit or delete this comment');
        }
    }

    async checkAccess(this: Comment, userId: string) {
        await Comment.checkAccess(this.commentId, userId);
    }
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
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}

Comment.init(commentSchema, {
    sequelize,
    modelName: "comment",
    tableName: "comments",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
})

export default Comment;
