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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const falseidol_db_config_1 = __importDefault(require("../../../config/falseidol.db.config"));
const user_drink_model_1 = __importDefault(require("./user.drink.model"));
const settings_model_1 = __importDefault(require("../settings/settings.model"));
class Drink extends sequelize_1.Model {
    static getDrinkById(drinkId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const attributes = ['drinkId', 'type', 'name', 'current', 'onMenu', 'price', 'happyHour', 'image', 'sort'];
            const descriptionSetting = yield settings_model_1.default.findByPk(3);
            if (descriptionSetting === null || descriptionSetting === void 0 ? void 0 : descriptionSetting.active) {
                attributes.push('description');
            }
            const drinkInstance = yield Drink.findByPk(drinkId, {
                rejectOnEmpty: new Error('Drink not found'),
                include: [{
                        model: user_drink_model_1.default,
                        as: 'userInfo',
                        where: { userId },
                        required: false
                    }]
            });
            const _c = drinkInstance.get({ plain: true }), { userInfo } = _c, drink = __rest(_c, ["userInfo"]);
            return Object.assign(Object.assign({}, drink), { notes: ((_a = userInfo[0]) === null || _a === void 0 ? void 0 : _a.notes) || null, ordered: ((_b = userInfo[0]) === null || _b === void 0 ? void 0 : _b.ordered) || 0 });
        });
    }
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
    },
    sort: {
        type: sequelize_1.default.INTEGER
    },
    description: {
        type: sequelize_1.default.STRING
    }
};
Drink.init(drinkSchema, {
    sequelize: falseidol_db_config_1.default,
    modelName: "drink",
    tableName: "drinks",
    timestamps: false
});
exports.default = Drink;
