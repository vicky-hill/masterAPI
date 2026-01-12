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
class ReqModel extends sequelize_1.Model {
}
const reqSchema = {
    reqId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: sequelize_1.default.INTEGER
    },
    featureId: {
        type: sequelize_1.default.INTEGER
    },
    latestReqId: {
        type: sequelize_1.default.INTEGER
    },
    changedReq: {
        type: sequelize_1.default.STRING
    },
    key: {
        type: sequelize_1.default.STRING
    },
    title: {
        type: sequelize_1.default.STRING
    },
    text: {
        type: sequelize_1.default.STRING
    },
    details: {
        type: sequelize_1.default.STRING
    },
    status: {
        type: sequelize_1.default.ENUM({ values: ['passed', 'failed'] })
    },
    sort: {
        type: sequelize_1.default.INTEGER
    }
};
ReqModel.init(reqSchema, {
    sequelize: reqdoc_db_config_1.default,
    modelName: "req",
    tableName: "reqs",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['sort', 'createdAt', 'updatedAt', 'deletedAt'] }
    },
    hooks: {
        beforeDestroy: (req, options) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.CommentModel.destroy({
                where: { reqId: req.featureId },
                transaction: options.transaction
            });
        }),
        beforeBulkDestroy: (options) => __awaiter(void 0, void 0, void 0, function* () {
            const reqs = yield ReqModel.findAll({
                where: options.where,
                attributes: ['reqId'],
                paranoid: false
            });
            const reqIds = reqs.map(r => r.reqId);
            yield models_1.CommentModel.destroy({
                where: { reqId: reqIds },
                transaction: options.transaction
            });
        })
    }
});
exports.default = ReqModel;
