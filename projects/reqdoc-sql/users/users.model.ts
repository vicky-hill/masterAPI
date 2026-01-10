import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { omit, TeamModel } from '../models'

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