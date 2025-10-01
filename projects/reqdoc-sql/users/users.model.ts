import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { Team } from '../../../types/reqdoc/attributes.types'


class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare userId: CreationOptional<number>
    declare teamId: number
    declare email: string
    declare role: 'admin' | 'user'
    declare deleted: boolean
    
    declare teams?: Team[]
    declare team?: Team
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
    },
    deleted: {
        type: Sequelize.BOOLEAN
    }
}

UserModel.init(userSchema, {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: false
})
            
export default UserModel;