import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Op, NonAttribute } from 'sequelize'
import sequelize from '../../../config/sandbox.db.config'
import { Tag, TagModel, User, UserModel } from '../utils/models'

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    declare postId: CreationOptional<number>
    declare likes: CreationOptional<number>
    declare views: CreationOptional<number>
    declare stats: CreationOptional<number>
    declare userId: string
    declare text: string
    declare category: string

    // declare user?: NonAttribute<UserModel>
    declare tags?: NonAttribute<TagModel>[]
}

const postSchema = {
    postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    stats: {
        type: Sequelize.VIRTUAL,
        get(this: Post) {
            return `likes: ${this.likes}, views: ${this.views}`;
        }
    },
    text: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        notEmpty: true,
        validate: {
            notNull: { msg: 'Text is required' },
            notEmpty: { msg: 'Text cannot be empty' }
        }
    }
}

class PostModel extends Post {
    static async getPostById(id: number) {
        const post = await this.findByPk(id);

        if (!post) throw new Error('Post not found');

        return post;
    }
}

PostModel.init(postSchema, {
    sequelize,
    modelName: "post",
    tableName: "posts",
    timestamps: false,
    scopes: {
        stats: {
            attributes: ['likes', 'views']
        },
        views(value) {
            return {
                where: {
                    views: { [Op.gte]: value }
                }
            };
        }
    },
    hooks: {
        afterUpdate: (post, options) => {
            
        }
    }
})

PostModel.afterUpdate(async (post, options) => {
   
});


export default PostModel;