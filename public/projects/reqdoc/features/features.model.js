"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const reqdoc_db_config_1 = __importDefault(require("../../../config/reqdoc.db.config"));
const models_1 = require("../models");
const redis_1 = require("../../../utils/redis");
const constants_1 = require("../utils/constants");
class Feature extends sequelize_1.Model {
    static clearCache(featureId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, redis_1.deleteValue)('feature:featureId', featureId);
        });
    }
    static getCache(featureId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const feature = yield (0, redis_1.getValue)('feature:featureId', featureId);
            if (!feature)
                return null;
            if (!((_a = feature.teamUserIds) === null || _a === void 0 ? void 0 : _a.includes(userId))) {
                throw new Error('Access denied');
            }
            return feature;
        });
    }
    static getFeaturesByProjectId(projectId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const features = yield this.findAll({
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
                        model: models_1.Req,
                        as: 'reqs',
                        required: false,
                        where: { changedReq: null },
                    }
                ],
                order: [
                    ['sort', 'ASC'],
                    [{ model: Feature, as: 'subFeatures' }, 'sort', 'ASC'],
                    [{ model: models_1.Req, as: 'reqs' }, 'sort', 'ASC']
                ]
            });
            if (options === null || options === void 0 ? void 0 : options.refresh) {
            }
            return features;
        });
    }
    setCache(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield models_1.Project.findByPk(this.projectId, {
                rejectOnEmpty: new Error('No project found for feature')
            });
            value.teamUserIds = yield models_1.Team.getTeamMembers(project.teamId);
            yield (0, redis_1.setValue)('feature:featureId', value);
        });
    }
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Feature.clearCache(this.featureId);
        });
    }
    checkAccess(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId === constants_1.ADMIN)
                return;
            const project = yield models_1.Project.findByPk(this.projectId);
            yield (project === null || project === void 0 ? void 0 : project.checkAccess(userId));
        });
    }
}
const featureSchema = {
    featureId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    parentId: {
        type: sequelize_1.default.INTEGER
    },
    name: {
        type: sequelize_1.default.STRING
    },
    sort: {
        type: sequelize_1.default.INTEGER
    }
};
Feature.init(featureSchema, {
    sequelize: reqdoc_db_config_1.default,
    modelName: "feature",
    tableName: "features",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['sort', 'createdAt', 'updatedAt', 'deletedAt'] }
    },
    hooks: {
        beforeDestroy: (feature, options) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Req.destroy({
                where: { featureId: feature.featureId },
                transaction: options.transaction
            });
            yield Feature.destroy({
                where: { parentId: feature.featureId },
                transaction: options.transaction
            });
        }),
        beforeBulkDestroy: (options) => __awaiter(void 0, void 0, void 0, function* () {
            const features = yield Feature.findAll({
                where: options.where,
                attributes: ['featureId'],
                paranoid: false
            });
            const featureIds = features.map(f => f.featureId);
            yield models_1.Req.destroy({
                where: { featureId: featureIds },
                transaction: options.transaction
            });
        })
    }
});
exports.default = Feature;
