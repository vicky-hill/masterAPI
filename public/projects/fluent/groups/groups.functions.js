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
exports.deleteGroup = exports.updateGroup = exports.createGroup = exports.getGroup = exports.getGroups = void 0;
const groups_model_1 = __importDefault(require("./groups.model"));
const getGroups = (language) => __awaiter(void 0, void 0, void 0, function* () {
    const groupInstances = yield groups_model_1.default.find().populate('words').lean();
    const groups = groupInstances.map(groupInstance => (Object.assign(Object.assign({}, groupInstance), { words: language ? groupInstance.words.map((word) => ({
            _id: word._id,
            english: word.english,
            target: word[language],
            image: word.image
        })) : groupInstance.words })));
    return groups;
});
exports.getGroups = getGroups;
const getGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield groups_model_1.default.findById(groupId).lean();
    if (!group)
        throw new Error('Group not found');
    return group;
});
exports.getGroup = getGroup;
const createGroup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const groupInstance = yield groups_model_1.default.create(Object.assign({}, data));
    const group = groupInstance.toObject();
    return group;
});
exports.createGroup = createGroup;
const updateGroup = (data, groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield groups_model_1.default.findByIdAndUpdate(groupId, data, { new: true }).lean();
    if (!group)
        throw new Error('Group not found');
    return group;
});
exports.updateGroup = updateGroup;
const deleteGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield groups_model_1.default.findByIdAndDelete(groupId).lean();
    if (!group)
        throw new Error('Group not found');
    return group;
});
exports.deleteGroup = deleteGroup;
