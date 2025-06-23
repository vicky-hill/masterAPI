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
exports.findReqByID = void 0;
const reqs_model_1 = __importDefault(require("./reqs.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const populate_1 = require("../utils/populate");
const findReqByID = function (reqId) {
    return __awaiter(this, void 0, void 0, function* () {
        const requirement = yield reqs_model_1.default
            .findById(reqId)
            .populate([populate_1.history, populate_1.comments, populate_1.feature]);
        !requirement && (0, throwError_1.default)(`Could not find req by ID: ${reqId}`);
        return requirement;
    });
};
exports.findReqByID = findReqByID;
