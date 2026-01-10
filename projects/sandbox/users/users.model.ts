import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, NonAttribute, Association, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin } from 'sequelize'
import sequelize from '../../../config/sandbox.db.config'
import ProfileModel from '../profiles/profiles.model'
import Post from '../posts/posts.model'



class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare userId: CreationOptional<string>
    declare name: string
    declare email: string

    declare getPosts: HasManyGetAssociationsMixin<Post>
    declare getActivePosts: HasManyGetAssociationsMixin<Post>

    declare createPost: HasManyCreateAssociationMixin<Post, 'userId'>
    declare addPost: HasManyAddAssociationMixin<Post, string>
    declare addPosts: HasManyAddAssociationsMixin<Post, string>
    declare setPost: HasManySetAssociationsMixin<Post, string>
    declare removePost: HasManyRemoveAssociationMixin<Post, string>
    declare removePosts: HasManyRemoveAssociationsMixin<Post, string>
    declare hasPost: HasManyHasAssociationMixin<Post, string>
    declare hasPosts: HasManyHasAssociationsMixin<Post, string>
    declare countPosts: HasManyCountAssociationsMixin

    declare getProfile: HasOneGetAssociationMixin<ProfileModel>
    declare setProfile: HasOneSetAssociationMixin<ProfileModel, string>
    declare createProfile: HasOneCreateAssociationMixin<ProfileModel>

    declare posts?: NonAttribute<Post>[]
    declare profile?: NonAttribute<ProfileModel>
}

const userSchema = {
    userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}

UserModel.init(userSchema, {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: false
})

export default UserModel;
