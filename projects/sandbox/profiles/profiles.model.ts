import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/sandbox.db.config'


export interface Profile {
    profileId: number
    userId: string
    title: string
    image: string
}

class ProfileModel extends Model<InferAttributes<ProfileModel>, InferCreationAttributes<ProfileModel>> {
    declare profileId: CreationOptional<number>
    declare userId: CreationOptional<string>
    declare title: string
    declare image: string
}

const profileSchema = {
    profileId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
}

ProfileModel.init(profileSchema, {
  sequelize,
  modelName: "profile",
  tableName: "profiles",
  timestamps: false
})




export default ProfileModel;
