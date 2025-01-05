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
exports.getCollections = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getCollections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project } = req.params;
        const collections = yield mongoose_1.default.connection.db.listCollections().toArray();
        const collectionNames = collections
            .map((collection) => collection.name)
            .filter((collection) => collection.toLowerCase().includes(project))
            .map((collection) => collection.split('_')[1]);
        res.json(collectionNames);
    }
    catch (err) {
        err.ctrl = exports.getCollections;
        next(err);
    }
});
exports.getCollections = getCollections;
