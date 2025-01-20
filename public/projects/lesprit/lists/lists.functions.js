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
exports.deleteUserLists = exports.deleteList = exports.removeListFromUser = exports.addListToUser = exports.updateList = exports.getList = exports.getPublicLists = exports.getLists = exports.createList = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const lists_model_1 = __importDefault(require("./lists.model"));
const words_model_1 = __importDefault(require("../words/words.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const createList = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield lists_model_1.default.create(Object.assign(Object.assign({}, data), { user: userId }));
    yield users_model_1.default.findByIdAndUpdate(userId, { $push: { lists: list._id } }, { new: true });
    return list;
});
exports.createList = createList;
const getLists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findById(userId).populate({
        path: 'lists',
        options: { sort: { createdAt: -1 } }
    });
    if (!user)
        return (0, throwError_1.default)('User not found');
    return user.lists;
});
exports.getLists = getLists;
const getPublicLists = () => __awaiter(void 0, void 0, void 0, function* () {
    const lists = yield lists_model_1.default.find({ public: true });
    return lists;
});
exports.getPublicLists = getPublicLists;
const getList = (listId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield lists_model_1.default.findById(listId);
    if (!list)
        return (0, throwError_1.default)('List not found');
    return list;
});
exports.getList = getList;
const updateList = (data, listId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield lists_model_1.default.findByIdAndUpdate(listId, data, { new: true });
    if (!list)
        return (0, throwError_1.default)('List not found');
    return list;
});
exports.updateList = updateList;
const addListToUser = (listId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield lists_model_1.default.findById(listId);
    if (!list)
        return (0, throwError_1.default)('List not found');
    const listWords = yield words_model_1.default.find({ list: listId, user: list.user });
    yield words_model_1.default.create(listWords.map(({ foreign, native, list }) => ({
        foreign,
        native,
        list,
        user: userId,
        rating: 0,
        dueDate: new Date()
    })));
    yield users_model_1.default.findByIdAndUpdate(userId, { $addToSet: { lists: listId } }, { new: true });
    return list;
});
exports.addListToUser = addListToUser;
const removeListFromUser = (listId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield lists_model_1.default.findById(listId);
    if (!list)
        return (0, throwError_1.default)('List not found');
    yield users_model_1.default.findByIdAndUpdate(userId, { $pull: { lists: listId } }, { new: true });
    return list;
});
exports.removeListFromUser = removeListFromUser;
const deleteList = (listId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield lists_model_1.default.findByIdAndUpdate(listId, { deleted: new Date() }, { new: true });
    if (!list)
        return (0, throwError_1.default)('List not found');
    yield words_model_1.default.deleteMany({ list: listId });
    return list;
});
exports.deleteList = deleteList;
const deleteUserLists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const words = yield words_model_1.default.deleteMany({ user: userId });
    const lists = yield lists_model_1.default.deleteMany({ user: userId });
    return lists.deletedCount;
});
exports.deleteUserLists = deleteUserLists;
