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
exports.deleteVerb = exports.updateVerb = exports.createVerb = exports.getVerb = exports.getAdminVerbs = void 0;
const verbs_model_1 = __importDefault(require("./verbs.model"));
const getAdminVerbs = () => __awaiter(void 0, void 0, void 0, function* () {
    const verbInstances = yield verbs_model_1.default.find().lean();
    const verbs = verbInstances.map(verbInstance => (Object.assign({}, verbInstance)));
    return verbs;
});
exports.getAdminVerbs = getAdminVerbs;
const getVerb = (verbId) => __awaiter(void 0, void 0, void 0, function* () {
    const verb = yield verbs_model_1.default.findById(verbId).lean();
    if (!verb)
        throw new Error('Verb not found');
    return verb;
});
exports.getVerb = getVerb;
const createVerb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const verbInstance = yield verbs_model_1.default.create(Object.assign({}, data));
    const verb = verbInstance.toObject();
    return verb;
});
exports.createVerb = createVerb;
const updateVerb = (data, verbId) => __awaiter(void 0, void 0, void 0, function* () {
    const verb = yield verbs_model_1.default.findByIdAndUpdate(verbId, data, { new: true }).lean();
    if (!verb)
        throw new Error('Verb not found');
    return verb;
});
exports.updateVerb = updateVerb;
const deleteVerb = (verbId) => __awaiter(void 0, void 0, void 0, function* () {
    const verb = yield verbs_model_1.default.findByIdAndDelete(verbId).lean();
    if (!verb)
        throw new Error('Verb not found');
    return verb;
});
exports.deleteVerb = deleteVerb;
