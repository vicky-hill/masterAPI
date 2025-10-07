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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const yup = __importStar(require("yup"));
const validateStrings = (values, string) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = string.split(" ");
    const schemaObject = {};
    fields.forEach((field) => {
        const isOptional = field.startsWith('~');
        if (isOptional) {
            schemaObject[field.slice(1)] = yup.string();
        }
        else {
            schemaObject[field] = yup.string().required(`No ${field} was provided`);
        }
    });
    const schema = yup.object().shape(schemaObject);
    yield schema.validate(values, { abortEarly: false });
});
const sort = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yup.array().of(yup.object().shape({
        _id: yup.string().required(),
        sort: yup.string().required()
    })).required('req.body is missing the products array');
    yield schema.validate(values, { abortEarly: false });
});
const validate = {
    sort,
    createReq: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "~title text feature"); }),
    updateReq: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "~title ~text ~details"); }),
    createProject: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "name teamId projectKey key"); }),
    updateProject: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "~name ~projectKey"); }),
    createFeature: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "name project"); }),
    updateFeature: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "name"); }),
    createTeam: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "user"); }),
    addComment: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "user text"); }),
    editComment: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "text"); }),
    createUser: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "firebaseID email"); }),
    updateUser: (values) => __awaiter(void 0, void 0, void 0, function* () { return yield validateStrings(values, "name"); }),
};
exports.default = validate;
