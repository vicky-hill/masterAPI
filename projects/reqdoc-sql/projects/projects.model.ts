import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { FeatureModel, omit, TeamModel } from '../models'
import { ADMIN } from '../utils/constants';

class ProjectModel extends Model<InferAttributes<ProjectModel, omit>, InferCreationAttributes<ProjectModel, omit>> {
    declare projectId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare teamId: number
    declare name: string
    declare projectKey: string
    declare reqKey: string

    declare team?: NonAttribute<TeamModel>
    declare features?: NonAttribute<FeatureModel>[]
    declare firstFeatureId?: NonAttribute<number> | null

    static async checkAccess(projectId: number | string, userId: string) {
        if (userId === ADMIN) return;

        const project = await this.findByPk(projectId, {
            rejectOnEmpty: new Error('Project not found'),
            include: [TeamModel]
        });

        if (!project.team) throw new Error('Project has no team');

        await project.team.checkAccess(userId);
    }

    async checkAccess(this: ProjectModel, userId: string) {
        if (userId === ADMIN) return;

        const team = await TeamModel.findByPk(this.teamId, {
            rejectOnEmpty: new Error('Team not found')
        });
        
        await team.checkAccess(userId);
    }
}

const projectSchema = {
    projectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teamId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // check that keys are unique to user
    projectKey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reqKey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstFeatureId: {
        type: Sequelize.VIRTUAL,

        get(this: ProjectModel) {
            return this.features?.length ? this.features[0].featureId : null
        }
    }
}

ProjectModel.init(projectSchema, {
    sequelize,
    modelName: "project",
    tableName: "projects",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    },
    hooks: {
        beforeDestroy: async (project, options) => {
            await FeatureModel.destroy({
                where: { projectId: project.projectId },
                transaction: options.transaction
            });

            // await ReqModel.destroy({
            //     where: { projectId: project.projectId },
            //     transaction: options.transaction
            // });
        }
    }
})


export default ProjectModel;