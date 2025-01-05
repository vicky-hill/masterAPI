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
exports.deleteFlagged = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const features_model_1 = __importDefault(require("../features/features.model"));
const projects_model_1 = __importDefault(require("../projects/projects.model"));
const reqs_model_1 = __importDefault(require("../reqs/reqs.model"));
const deleteFlagged = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email !== 'pm@excersys.com')
        (0, throwError_1.default)('Not authorized, dev route only');
    yield projects_model_1.default.deleteMany({ deleted: true });
    yield reqs_model_1.default.deleteMany({ deleted: true });
    yield features_model_1.default.deleteMany({ deleted: true });
});
exports.deleteFlagged = deleteFlagged;
