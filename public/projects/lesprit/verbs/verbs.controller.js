"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVerb = exports.updateVerb = exports.createVerb = exports.getVerb = exports.getAdminVerbs = void 0;
const Verb = __importStar(require("./verbs.functions"));
const getAdminVerbs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verbs = yield Verb.getAdminVerbs();
        res.json(verbs);
    }
    catch (err) {
        next(err);
    }
});
exports.getAdminVerbs = getAdminVerbs;
const getVerb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { verbId } = req.params;
        const verb = yield Verb.getVerb(verbId);
        res.json(verb);
    }
    catch (err) {
        next(err);
    }
});
exports.getVerb = getVerb;
const createVerb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verb = yield Verb.createVerb(req.body);
        res.json(verb);
    }
    catch (err) {
        next(err);
    }
});
exports.createVerb = createVerb;
const updateVerb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { verbId } = req.params;
        const verb = yield Verb.updateVerb(req.body, verbId);
        res.json(verb);
    }
    catch (err) {
        next(err);
    }
});
exports.updateVerb = updateVerb;
const deleteVerb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { verbId } = req.params;
        const verb = yield Verb.deleteVerb(verbId);
        res.json(verb);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteVerb = deleteVerb;
