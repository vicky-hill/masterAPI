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
exports.getLessons = void 0;
const phrases_model_1 = __importDefault(require("../phrases/phrases.model"));
const lessons_model_1 = __importDefault(require("./lessons.model"));
const getLessons = () => __awaiter(void 0, void 0, void 0, function* () {
    const lessonInstances = yield lessons_model_1.default.findAll({
        where: {},
        include: [{
                model: phrases_model_1.default,
                as: 'phrases'
            }]
    });
    const lessons = lessonInstances.map((lessonInstance) => {
        const lesson = lessonInstance.get({ plain: true });
        return Object.assign({}, lesson);
    });
    return lessons;
});
exports.getLessons = getLessons;
