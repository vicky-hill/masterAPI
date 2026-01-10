import { InferAttributes, Op } from 'sequelize'

import UserModel from '../users/users.model'
import PostModel from '../posts/posts.model'
import ProfileModel from '../profiles/profiles.model'
import TagModel from '../tags/tags.model'
import PostTagModel from '../tags/postTags.model'

export type User = InferAttributes<UserModel>
export type Tag = InferAttributes<TagModel>
export type Post = InferAttributes<PostModel>
export type Profile = InferAttributes<ProfileModel>

export {
    UserModel,
    PostModel,
    ProfileModel,
    TagModel
}

UserModel.hasOne(ProfileModel, {
    foreignKey: 'userId'
});

ProfileModel.belongsTo(UserModel, {
    foreignKey: 'userId'
});

UserModel.hasMany(PostModel, {
    foreignKey: 'userId'
});

UserModel.hasMany(PostModel, {
    foreignKey: 'userId',
    scope: {
        views: { [Op.gt]: 5 }
    },
    as: 'activePosts'
});

PostModel.belongsTo(UserModel, {
    foreignKey: 'userId'
});

TagModel.belongsToMany(PostModel, {
    through: PostTagModel,
    foreignKey: 'tagId',
    otherKey: 'postId'
})

PostModel.belongsToMany(TagModel, {
    through: PostTagModel,
    foreignKey: 'postId',
    otherKey: 'tagId'
})