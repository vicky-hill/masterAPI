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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLessons = exports.getLessons = void 0;
const include_1 = require("../utils/include");
const lessons_model_1 = __importDefault(require("./lessons.model"));
const getLessons = (language, section) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    if (language)
        where.language = language;
    if (section)
        where.section = section;
    const lessonInstances = yield lessons_model_1.default.findAll({
        where,
        include: [include_1.includePhrase],
        order: [[['sort', 'ASC']], include_1.orderPhrases],
    });
    const lessons = lessonInstances.map((lessonInstance) => {
        const _a = lessonInstance.get({ plain: true }), { sort } = _a, lesson = __rest(_a, ["sort"]);
        return lesson;
    });
    return lessons;
});
exports.getLessons = getLessons;
const createLessons = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const lessons = yield lessons_model_1.default.bulkCreate(data);
    return lessons;
});
exports.createLessons = createLessons;
