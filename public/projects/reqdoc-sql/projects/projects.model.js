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
const constants_1 = require("../utils/constants");
class ProjectModel extends sequelize_1.Model {
    static checkAccess(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId === constants_1.ADMIN)
                return;
            const project = yield this.findByPk(projectId, {
                rejectOnEmpty: new Error('Project not found'),
                include: [models_1.TeamModel]
            });
            if (!project.team)
                throw new Error('Project has no team');
            yield project.team.checkAccess(userId);
        });
    }
    checkAccess(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId === constants_1.ADMIN)
                return;
            const team = yield models_1.TeamModel.findByPk(this.teamId, {
                rejectOnEmpty: new Error('Team not found')
            });
            yield team.checkAccess(userId);
        });
    }
}
const projectSchema = {
    projectId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teamId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    // check that keys are unique to user
    projectKey: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    reqKey: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    firstFeatureId: {
        type: sequelize_1.default.VIRTUAL,
        get() {
            var _a;
            return ((_a = this.features) === null || _a === void 0 ? void 0 : _a.length) ? this.features[0].featureId : null;
        }
    }
};
ProjectModel.init(projectSchema, {
    sequelize: reqdoc_db_config_1.default,
    modelName: "project",
    tableName: "projects",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    },
    hooks: {
        beforeDestroy: (project, options) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.FeatureModel.destroy({
                where: { projectId: project.projectId },
                transaction: options.transaction
            });
            // await ReqModel.destroy({
            //     where: { projectId: project.projectId },
            //     transaction: options.transaction
            // });
        })
    }
});
exports.default = ProjectModel;
