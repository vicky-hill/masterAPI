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
const sandbox_db_config_1 = __importDefault(require("../../../config/sandbox.db.config"));
class Post extends sequelize_1.Model {
}
const postSchema = {
    postId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.default.STRING,
    },
    category: {
        type: sequelize_1.default.STRING,
    },
    likes: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 0
    },
    views: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 0
    },
    stats: {
        type: sequelize_1.default.VIRTUAL,
        get() {
            return `likes: ${this.likes}, views: ${this.views}`;
        }
    },
    text: {
        type: sequelize_1.default.STRING,
        unique: true,
        allowNull: false,
        notEmpty: true,
        validate: {
            notNull: { msg: 'Text is required' },
            notEmpty: { msg: 'Text cannot be empty' }
        }
    }
};
class PostModel extends Post {
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.findByPk(id);
            if (!post)
                throw new Error('Post not found');
            return post;
        });
    }
}
PostModel.init(postSchema, {
    sequelize: sandbox_db_config_1.default,
    modelName: "post",
    tableName: "posts",
    timestamps: false,
    scopes: {
        stats: {
            attributes: ['likes', 'views']
        },
        views(value) {
            return {
                where: {
                    views: { [sequelize_1.Op.gte]: value }
                }
            };
        }
    },
    hooks: {
        afterUpdate: (post, options) => {
        }
    }
});
PostModel.afterUpdate((post, options) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = PostModel;
