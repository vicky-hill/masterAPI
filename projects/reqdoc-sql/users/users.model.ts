import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { FeatureModel, omit, ProjectModel, TeamModel } from '../models'
import { deleteValue, getValue, setValue } from '../../../utils/redis'

class UserModel extends Model<InferAttributes<UserModel, omit>, InferCreationAttributes<UserModel, omit>> {
    declare userId: CreationOptional<string>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare teamId: number
    declare email: string
    declare role: 'admin' | 'user'

    declare teams?: NonAttribute<TeamModel>[]
    declare team?: NonAttribute<TeamModel>

//     async getUsersByFeature(featureId: number) {
//         const cached = await getValue('users:feature', featureId);
//         if (cached) return cached.users;
//         
//         const feature = await FeatureModel.findByPk(featureId, {
//             include: [{
//                 model: ProjectModel,
//                 include: [{
//                     model: TeamModel,
//                     include: [UserModel]
//                 }]
//             }]
//         })
// 
//         if (feature?.project?.team?.users?.length) {
//             const users = feature?.project?.team?.users.map(user => user.userId);
//             const value =  { featureId, users };
//             
//             await setValue('users:feature', value);
//             return feature?.project?.team?.users.map(user => user.userId);
//         }
//     }
}

const userSchema = {
    userId: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    teamId: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.ENUM({ values: ['admin', 'user'] })
    }
}

UserModel.init(userSchema, {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    }
})

export default UserModel;