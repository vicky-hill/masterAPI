import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import {omit, Project, Req, Team} from '../models'
import { deleteValue, setValue, getValue } from '../../../utils/redis'
import { ADMIN } from '../utils/constants'

class Feature extends Model<InferAttributes<Feature, omit>, InferCreationAttributes<Feature, omit>> {
    declare featureId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare projectId: number
    declare parentId?: number | null
    declare name: string
    declare sort: number

    declare reqs?: NonAttribute<Req>[]
    declare project?: NonAttribute<Project>
    declare subFeatures?: NonAttribute<Feature>[]
    declare mainFeature?: NonAttribute<Feature>

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
                    model: Feature,
                    as: 'subFeatures'
                },
                {
                    model: Feature,
                    as: 'mainFeature'
                },
                {
                    model: Req,
                    as: 'reqs',
                    required: false,
                    where: { changedReq: null },
                }
            ],
            order: [
                ['sort', 'ASC'],
                [{ model: Feature, as: 'subFeatures' }, 'sort', 'ASC'],
                [{ model: Req, as: 'reqs' }, 'sort', 'ASC']
            ]
        });

        if (options?.refresh) {

        }

        return features;
    }

    async setCache(value: Feature) {
        const project = await Project.findByPk(this.projectId, {
            rejectOnEmpty: new Error('No project found for feature')
        })

        value.teamUserIds = await Team.getTeamMembers(project.teamId);

        await setValue('feature:featureId', value);
    }

    async clearCache(this: Feature) {
        await Feature.clearCache(this.featureId);
    }

    async checkAccess(this: Feature, userId: string) {
        if (userId === ADMIN) return;

        const project = await Project.findByPk(this.projectId);
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

Feature.init(featureSchema, {
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
            await Req.destroy({
                where: { featureId: feature.featureId },
                transaction: options.transaction
            });

            await Feature.destroy({
                where: { parentId: feature.featureId },
                transaction: options.transaction
            });
        },
        beforeBulkDestroy: async (options) => {
            const features = await Feature.findAll({
                where: options.where,
                attributes: ['featureId'],
                paranoid: false
            });

            const featureIds = features.map(f => f.featureId);

            await Req.destroy({
                where: { featureId: featureIds },
                transaction: options.transaction
            });
        }
    }
})




export default Feature;