import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import {omit, ProjectModel, ReqModel, TeamModel} from '../models'
import { deleteValue, setValue, getValue } from '../../../utils/redis'
import { ADMIN } from '../utils/constants'

class FeatureModel extends Model<InferAttributes<FeatureModel, omit>, InferCreationAttributes<FeatureModel, omit>> {
    declare featureId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare projectId: number
    declare parentId?: number | null
    declare name: string
    declare sort: number

    declare reqs?: NonAttribute<ReqModel>[]
    declare project?: NonAttribute<ProjectModel>
    declare subFeatures?: NonAttribute<FeatureModel>[]
    declare mainFeature?: NonAttribute<FeatureModel>

    declare teamUserIds?: string[]

    static async clearCache(featureId: string | number) {
        await deleteValue('feature:featureId', featureId);
    }

    static async getCache(featureId: string | number, userId: string) {
        const feature = await getValue('feature:featureId', featureId);
        if (!feature) return null;

        if (!feature.teamUserIds?.includes(userId)) {
            throw new Error('Access denied');
        }

        return feature;
    }

    static async getFeaturesByProjectId(projectId: string | number, options?: { refresh?: boolean}) {
        const features = await this.findAll({
            where: { projectId, parentId: null },
            include: [
                {
                    model: FeatureModel,
                    as: 'subFeatures'
                },
                {
                    model: FeatureModel,
                    as: 'mainFeature'
                },
                {
                    model: ReqModel,
                    as: 'reqs',
                    required: false,
                    where: { changedReq: null },
                }
            ],
            order: [
                ['sort', 'ASC'],
                [{ model: FeatureModel, as: 'subFeatures' }, 'sort', 'ASC'],
                [{ model: ReqModel, as: 'reqs' }, 'sort', 'ASC']
            ]
        });

        if (options?.refresh) {

        }

        return features;
    }

    async setCache(value: FeatureModel) {
        const project = await ProjectModel.findByPk(this.projectId, {
            rejectOnEmpty: new Error('No project found for feature')
        })

        value.teamUserIds = await TeamModel.getTeamMembers(project.teamId);

        await setValue('feature:featureId', value);
    }

    async clearCache(this: FeatureModel) {
        await FeatureModel.clearCache(this.featureId);
    }

    async checkAccess(this: FeatureModel, userId: string) {
        if (userId === ADMIN) return;

        const project = await ProjectModel.findByPk(this.projectId);
        await project?.checkAccess(userId);
    }
}

const featureSchema = {
    featureId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    parentId: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    sort: {
        type: Sequelize.INTEGER
    }
}

FeatureModel.init(featureSchema, {
    sequelize,
    modelName: "feature",
    tableName: "features",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['sort', 'createdAt', 'updatedAt', 'deletedAt'] }
    },
    hooks: {
        beforeDestroy: async (feature, options) => {
            await ReqModel.destroy({
                where: { featureId: feature.featureId },
                transaction: options.transaction
            });

            await FeatureModel.destroy({
                where: { parentId: feature.featureId },
                transaction: options.transaction
            });
        },
        beforeBulkDestroy: async (options) => {
            const features = await FeatureModel.findAll({
                where: options.where,
                attributes: ['featureId'],
                paranoid: false
            });

            const featureIds = features.map(f => f.featureId);

            await ReqModel.destroy({
                where: { featureId: featureIds },
                transaction: options.transaction
            });
        }
    }
})




export default FeatureModel;