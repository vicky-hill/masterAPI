"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drinks_model_1 = __importDefault(require("./drinks/drinks.model"));
const user_drink_model_1 = __importDefault(require("./drinks/user.drink.model"));
const images_model_1 = __importDefault(require("./images/images.model"));
const logs_model_1 = __importDefault(require("./logs/logs.model"));
const settings_model_1 = __importDefault(require("./settings/settings.model"));
const users_model_1 = __importDefault(require("./users/users.model"));
drinks_model_1.default.hasOne(user_drink_model_1.default, {
    foreignKey: 'drinkId',
    sourceKey: 'drinkId',
    as: 'userInfo'
});
exports.default = {
    Drink: drinks_model_1.default,
    UserDrink: user_drink_model_1.default,
    Image: images_model_1.default,
    Log: logs_model_1.default,
    Setting: settings_model_1.default,
    User: users_model_1.default
};
