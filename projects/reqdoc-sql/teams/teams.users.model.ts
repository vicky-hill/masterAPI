import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'


class TeamUserModel extends Model<InferAttributes<TeamUserModel>, InferCreationAttributes<TeamUserModel>> {
    declare teamUserId: CreationOptional<number>
    declare teamId: number
    declare userId: number
}

const teamUserSchema = {
    teamUserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teamId: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    }
}

TeamUserModel.init(teamUserSchema, {
  sequelize,
  modelName: "TeamUser",
  tableName: "teamUsers",
  timestamps: false
})

export default TeamUserModel;