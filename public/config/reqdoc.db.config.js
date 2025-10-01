"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    env: 'development',
    jwtSecret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '',
    jwtExpiresIn: (_b = process.env.JWT_EXPIRY) !== null && _b !== void 0 ? _b : '',
    port: (_c = Number(process.env.PORT)) !== null && _c !== void 0 ? _c : 4040,
    db: {
        username: (_d = process.env.DB_REQDOC_USERNAME) !== null && _d !== void 0 ? _d : '',
        password: (_e = process.env.DB_REQDOC_PASSWORD) !== null && _e !== void 0 ? _e : '',
        dbName: (_f = process.env.DB_REQDOC_NAME) !== null && _f !== void 0 ? _f : '',
        details: {
            host: (_g = process.env.DB_REQDOC_HOST) !== null && _g !== void 0 ? _g : '',
            dialect: 'mysql',
            dialectModule: mysql2_1.default,
            pool: {
                max: 5,
                min: 0,
                idle: 100000,
                acquire: 300000
            },
            dialectOptions: {
                connectTimeout: 600000
            }
        }
    },
};
const sequelize = new sequelize_1.Sequelize(config.db.dbName, config.db.username, config.db.password, config.db.details);
exports.default = sequelize;
