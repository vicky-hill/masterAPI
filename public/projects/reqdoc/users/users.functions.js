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
exports.getUser = exports.updateUser = exports.inviteUser = exports.createUser = exports.getUsers = void 0;
const users_model_1 = __importDefault(require("./users.model"));
const teams_model_1 = __importDefault(require("../teams/teams.model"));
const projects_model_1 = __importDefault(require("../projects/projects.model"));
const validation_1 = __importDefault(require("../utils/validation"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.default.find()
        .select('-firebaseID -createdAt -updatedAt -__v');
    return users;
});
exports.getUsers = getUsers;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const name = (_a = data.email) === null || _a === void 0 ? void 0 : _a.split('@')[0];
    const body = Object.assign(Object.assign({}, data), { name });
    yield validation_1.default.createUser(body);
    const newUser = yield users_model_1.default.create(body);
    const newTeam = yield teams_model_1.default.create({
        name: 'New Team',
        users: [{ user: newUser._id, role: 'admin' }]
    });
    yield users_model_1.default.findByIdAndUpdate(newUser._id, { team: newTeam._id, role: 'admin' }, { new: true });
    const user = yield users_model_1.default.findById(newUser._id)
        .select('-firebaseID -createdAt -updatedAt -__v');
    return user;
});
exports.createUser = createUser;
const inviteUser = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { team } = data;
    if (userId) {
        yield teams_model_1.default.findByIdAndUpdate(team, { $push: { users: { user: userId, role: 'user' } } }, { new: true });
        const user = yield users_model_1.default.findById(userId)
            .select('-firebaseID -createdAt -updatedAt -__v');
        return user;
    }
    return null;
});
exports.inviteUser = inviteUser;
const updateUser = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.updateUser(data);
    const updatedUser = yield users_model_1.default.findByIdAndUpdate(userId, data, { new: true })
        .select('-firebaseID -createdAt -updatedAt -__v');
    return updatedUser;
});
exports.updateUser = updateUser;
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        return null;
    const decodedToken = (0, jwt_decode_1.default)(token);
    const user = yield users_model_1.default.findOne({ firebaseID: decodedToken.user_id })
        .select('-firebaseID -createdAt -updatedAt -__v')
        .populate({
        path: 'team',
        select: '-createdAt -updatedAt -__v'
    });
    if (!user)
        return null;
    const projects = yield projects_model_1.default.find({
        team: user.team,
        deleted: { $exists: false }
    })
        .select('-createdAt -updatedAt -__v')
        .populate('features');
    return Object.assign(Object.assign({}, user.toJSON()), { projects });
});
exports.getUser = getUser;
