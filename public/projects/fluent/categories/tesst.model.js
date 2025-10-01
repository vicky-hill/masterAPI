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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const fluent_db_config_1 = __importDefault(require("../../../config/fluent.db.config"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
const groups_model_1 = __importDefault(require("../groups/groups.model"));
class TestModel extends sequelize_1.Model {
}
const testSchema = {
    testId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.default.STRING
    },
    count: {
        type: sequelize_1.default.INTEGER
    },
    categoryId: {
        type: sequelize_1.default.INTEGER
    }
};
TestModel.init(testSchema, {
    sequelize: fluent_db_config_1.default,
    modelName: "Test",
    tableName: "tests",
    timestamps: false
});
TestModel.hasOne(categories_model_1.default, {
    foreignKey: 'categoryId',
    sourceKey: 'categoryId',
    as: 'category'
});
TestModel.hasMany(groups_model_1.default, {
    foreignKey: "testId",
    as: 'groups'
});
exports.default = TestModel;
