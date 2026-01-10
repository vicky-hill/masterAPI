"use strict";
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
exports.getPosts = void 0;
const posts_model_1 = __importDefault(require("./posts.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.default.getPostById(1);
    const userInstance = yield users_model_1.default.findByPk('abc', {
        include: [posts_model_1.default]
    });
    if (userInstance) {
        // const user = userInstance.get({ plain: true });
        if (userInstance) {
            const id = userInstance;
        }
    }
    return post;
});
exports.getPosts = getPosts;
// This will cause the "beforeDestroy" and "afterDestroy"
users_model_1.default.hasMany(posts_model_1.default, {
    onDelete: 'cascade',
    hooks: true
});
// https://www.youtube.com/watch?v=qfK6H714moc
