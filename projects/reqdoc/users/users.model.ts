import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { omit, Team } from '../models'

class UserModel extends Model<InferAttributes<UserModel, omit>, InferCreationAttributes<UserModel, omit>> {
    declare userId: CreationOptional<string>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare teamId: number | null
    declare email: string
    declare role: 'admin' | 'user'

    declare teams?: NonAttribute<Team>[]
    declare team?: NonAttribute<Team>

    static async getUserById(userId: string) {
        const user = await this.findByPk(userId, {
            rejectOnEmpty: new Error('User not found'),
            include: [
                {
                    model: Team,
                    through: { attributes: [] }
                },
                Team
            ]
        });

        return user;
    }
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
        type: Sequelize.ENUM({ values: ['admin', 'user'] }),
        defaultValue: 'user'
    }
}

UserModel.init(userSchema, {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
})

export default UserModel;