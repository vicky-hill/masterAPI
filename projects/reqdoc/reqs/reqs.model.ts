import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { omit, Project, Feature, UserModel } from '../models'
import Comment from '../comments/comments.model'

import { ADMIN } from '../utils/constants'

class Req extends Model<InferAttributes<Req, omit>, InferCreationAttributes<Req, omit>> {
    declare reqId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare projectId: number
    declare featureId: number
    declare changedReq?: string | null
    declare latestReqId?: number
    declare key: string
    declare title?: string
    declare text: string
    declare details?: string
    declare status?: 'passed' | 'failed' | null
    declare sort: number

    declare history?: NonAttribute<Req>[]

    static async checkAccess(reqId: string | number, userId: string) {
        if (userId === ADMIN) return;

        const req = await this.findByPk(reqId, {
            rejectOnEmpty: new Error('Req not found')
        })

        await Project.checkAccess(req.projectId, userId);
    }

    static async getReqById(reqId: string | number, userId?: string): Promise<Req> {
        const req = await this.scope('full').findByPk(reqId, {
            rejectOnEmpty: new Error('Req not found')
        });

        if (userId) await req.checkAccess(userId);
        
        return req;
    }

    async checkAccess(this: Req, userId: string) {
        if (userId === ADMIN) return;
        await Project.checkAccess(this.projectId, userId);
    }
}

const reqSchema = {
    reqId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: Sequelize.INTEGER
    },
    featureId: {
        type: Sequelize.INTEGER
    },
    latestReqId: {
        type: Sequelize.INTEGER
    },
    changedReq: {
        type: Sequelize.STRING
    },
    key: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    },
    details: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM({ values: ['passed', 'failed'] })
    },
    sort: {
        type: Sequelize.INTEGER
    }
}

const include = [
    {
        model: Comment,
        required: false,
        include: [UserModel]
    },
    {
        model: Req,
        as: 'history',
        required: false
    },
    {
        model: Feature,
        required: false
    }
]

const attributes = { exclude: ['sort', 'createdAt', 'updatedAt', 'deletedAt'] };

Req.init(reqSchema, {
    sequelize,
    modelName: "req",
    tableName: "reqs",
    timestamps: true,
    paranoid: true,
    defaultScope: { attributes },
    scopes: {
        full: {
            attributes,
            include
        },
        latest: {
            attributes,
            include,
            where: { changedReq: null },
        }
    },
    hooks: {
        beforeDestroy: async (req, options) => {
            await Comment.destroy({
                where: { reqId: req.reqId },
                transaction: options.transaction
            });
        },
        beforeBulkDestroy: async (options) => {
            const reqs = await Req.findAll({
                where: options.where,
                attributes: ['reqId'],
                paranoid: false
            });

            const reqIds = reqs.map(r => r.reqId);

            await Comment.destroy({
                where: { reqId: reqIds },
                transaction: options.transaction
            });
        }
    }
})


export default Req;