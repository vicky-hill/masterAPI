import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare userId: CreationOptional<number>
    declare name: string
    declare email: string
    declare verified: boolean
    declare isAdmin: boolean
}

const userSchema = {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}

User.init(userSchema, {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: false
})


export default User;