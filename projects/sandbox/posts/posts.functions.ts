import { QueryInterface, Sequelize, Attributes, InferAttributes } from 'sequelize'
import PostModel from './posts.model'
import TagModel from '../tags/tags.model'
import sequelize from '../../../config/sandbox.db.config'
import ProfileModel from '../profiles/profiles.model'
import UserModel from '../users/users.model'




export const getPosts = async () => {
    const post = await PostModel.getPostById(1)
    const userInstance = await UserModel.findByPk('abc', {
        include: [PostModel]
    })

    if (userInstance) {
        // const user = userInstance.get({ plain: true });

        if (userInstance) {
            const id = userInstance
        }
    }

    return post;
}

// This will cause the "beforeDestroy" and "afterDestroy"
UserModel.hasMany(PostModel, {
    onDelete: 'cascade',
    hooks: true
});

// https://www.youtube.com/watch?v=qfK6H714moc



