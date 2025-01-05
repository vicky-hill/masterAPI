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
exports.getUser = exports.createUser = exports.getUsers = void 0;
const users_model_1 = __importDefault(require("./users.model"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const validation_1 = __importDefault(require("../utils/validation"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model_1.default.find()
            .select('-firebaseId -createdAt -updatedAt -__v')
            .populate('been', 'name');
        res.json(users);
    }
    catch (err) {
        err.ctrl = exports.getUsers;
        next(err);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        req.body;
        const username = (_a = req.body.email) === null || _a === void 0 ? void 0 : _a.split('@')[0];
        const body = Object.assign(Object.assign({}, req.body), { username });
        yield validation_1.default.createUser(body);
        const newUser = yield users_model_1.default.create(body);
        const user = yield users_model_1.default.findById(newUser._id)
            .select('-firebaseID -createdAt -updatedAt -__v');
        res.status(201).json(user);
    }
    catch (err) {
        err.ctrl = exports.createUser;
        next(err);
    }
});
exports.createUser = createUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            res.json(null);
            return;
        }
        const decodedToken = (0, jwt_decode_1.default)(token);
        const user = yield users_model_1.default.findOne({ firebaseID: decodedToken.user_id })
            .select('-firebaseId -createdAt -updatedAt -__v');
        if (!user) {
            res.json(null);
            return;
        }
        res.json(user);
    }
    catch (err) {
        err.ctrl = exports.getUser;
        next(err);
    }
});
exports.getUser = getUser;
