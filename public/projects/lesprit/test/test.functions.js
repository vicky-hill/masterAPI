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
exports.deleteList = exports.updateList = exports.getList = exports.getLists = exports.createList = void 0;
const test_model_1 = __importDefault(require("./test.model"));
const createList = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const listInstance = yield test_model_1.default.create(Object.assign({}, data));
    const list = listInstance.toObject();
    return list;
});
exports.createList = createList;
const getLists = () => __awaiter(void 0, void 0, void 0, function* () {
    const listInstances = yield test_model_1.default.find().lean();
    const lists = listInstances.map(listInstance => (Object.assign({}, listInstance)));
    return lists;
});
exports.getLists = getLists;
const getList = (listId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield test_model_1.default.findById(listId).lean();
    if (!list)
        throw new Error('List not found');
    return list;
});
exports.getList = getList;
const updateList = (data, listId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield test_model_1.default.findByIdAndUpdate(listId, data, { new: true }).lean();
    if (!list)
        throw new Error('List not found');
    return list;
});
exports.updateList = updateList;
const deleteList = (listId) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield test_model_1.default.findByIdAndDelete(listId).lean();
    if (!list)
        throw new Error('List not found');
    return list;
});
exports.deleteList = deleteList;
