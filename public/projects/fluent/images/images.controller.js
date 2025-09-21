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
exports.deleteImage = exports.updateImage = exports.createImage = exports.getImage = exports.getImages = void 0;
const Image = __importStar(require("./images.functions"));
const getImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield Image.getImages();
        res.json(images);
    }
    catch (err) {
        next(err);
    }
});
exports.getImages = getImages;
const getImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageId } = req.params;
        const image = yield Image.getImage(imageId);
        res.json(image);
    }
    catch (err) {
        next(err);
    }
});
exports.getImage = getImage;
const createImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield Image.createImage(req.body);
        res.json(image);
    }
    catch (err) {
        next(err);
    }
});
exports.createImage = createImage;
const updateImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageId } = req.params;
        const image = yield Image.updateImage(req.body, imageId);
        res.json(image);
    }
    catch (err) {
        next(err);
    }
});
exports.updateImage = updateImage;
const deleteImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageId } = req.params;
        const image = yield Image.deleteImage(imageId);
        res.json(image);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteImage = deleteImage;
