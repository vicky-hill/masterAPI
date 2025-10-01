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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const fluent_db_config_1 = __importDefault(require("../../../config/fluent.db.config"));
const words_model_1 = __importDefault(require("../words/words.model"));
class CategoryModel extends sequelize_1.Model {
}
const categorySchema = {
    categoryId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupId: {
        type: sequelize_1.default.INTEGER,
    },
    name: {
        type: sequelize_1.default.STRING,
    },
    sort: {
        type: sequelize_1.default.INTEGER,
    },
};
CategoryModel.init(categorySchema, {
    sequelize: fluent_db_config_1.default,
    modelName: "Category",
    tableName: "categories",
    timestamps: false
});
CategoryModel.hasMany(words_model_1.default, {
    foreignKey: "categoryId",
    as: 'words'
});
exports.default = CategoryModel;
