"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Setting = exports.Log = exports.Image = exports.UserDrink = exports.Drink = void 0;
const drinks_model_1 = __importDefault(require("../drinks/drinks.model"));
exports.Drink = drinks_model_1.default;
const user_drink_model_1 = __importDefault(require("../drinks/user.drink.model"));
exports.UserDrink = user_drink_model_1.default;
const images_model_1 = __importDefault(require("../images/images.model"));
exports.Image = images_model_1.default;
const logs_model_1 = __importDefault(require("../logs/logs.model"));
exports.Log = logs_model_1.default;
const settings_model_1 = __importDefault(require("../settings/settings.model"));
exports.Setting = settings_model_1.default;
const users_model_1 = __importDefault(require("../users/users.model"));
exports.User = users_model_1.default;
drinks_model_1.default.belongsToMany(user_drink_model_1.default, {
    through: user_drink_model_1.default,
    foreignKey: 'drinkId',
    otherKey: 'userDrinkId',
    as: 'userInfo'
});
users_model_1.default.belongsToMany(user_drink_model_1.default, {
    through: user_drink_model_1.default,
    foreignKey: 'userDrinkId',
    otherKey: 'drinkId',
    as: 'drinkInfo'
});
user_drink_model_1.default.hasMany(users_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
drinks_model_1.default.hasMany(user_drink_model_1.default, {
    foreignKey: 'drinkId',
    onDelete: 'CASCADE'
});
