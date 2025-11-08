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
const falseidol_db_config_1 = __importDefault(require("../../../config/falseidol.db.config"));
const user_drink_model_1 = __importDefault(require("./user.drink.model"));
class DrinkModel extends sequelize_1.Model {
}
const drinkSchema = {
    drinkId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: sequelize_1.default.ENUM({ values: ['cocktail', 'bowl', 'neat'] })
    },
    name: {
        type: sequelize_1.default.STRING,
        unique: true
    },
    country: {
        type: sequelize_1.default.STRING
    },
    image: {
        type: sequelize_1.default.STRING
    },
    current: {
        type: sequelize_1.default.BOOLEAN
    },
    price: {
        type: sequelize_1.default.DECIMAL
    },
    onMenu: {
        type: sequelize_1.default.BOOLEAN
    },
    happyHour: {
        type: sequelize_1.default.BOOLEAN
    }
};
DrinkModel.init(drinkSchema, {
    sequelize: falseidol_db_config_1.default,
    modelName: "Drink",
    tableName: "drinks",
    timestamps: false
});
DrinkModel.hasOne(user_drink_model_1.default, {
    foreignKey: 'drinkId',
    sourceKey: 'drinkId',
    as: 'userInfo'
});
exports.default = DrinkModel;
