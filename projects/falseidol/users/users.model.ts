import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'


class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare userId: CreationOptional<number>
    declare name: string
    declare email: string
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
    }
}

UserModel.init(userSchema, {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: false
})


export default UserModel;