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
exports.deleteNeighborhood = exports.updateNeighborhood = exports.createNeighborhood = exports.getNeighborhood = exports.getNeighborhoods = void 0;
const neighborhoods_model_1 = __importDefault(require("../../snapplist/neighborhoods/neighborhoods.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getNeighborhoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const neighborhoods = yield neighborhoods_model_1.default.find();
        res.json(neighborhoods);
    }
    catch (err) {
        err.ctrl = exports.getNeighborhoods;
        next(err);
    }
});
exports.getNeighborhoods = getNeighborhoods;
const getNeighborhood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { neighborhoodId } = req.params;
        const neighborhood = yield neighborhoods_model_1.default.findById(neighborhoodId);
        if (!neighborhood)
            return (0, throwError_1.default)('Neighborhood not found');
        res.json(neighborhood);
    }
    catch (err) {
        err.ctrl = exports.getNeighborhood;
        next(err);
    }
});
exports.getNeighborhood = getNeighborhood;
const createNeighborhood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const neighborhood = yield neighborhoods_model_1.default.create(req.body);
        res.json(neighborhood);
    }
    catch (err) {
        err.ctrl = exports.createNeighborhood;
        next(err);
    }
});
exports.createNeighborhood = createNeighborhood;
const updateNeighborhood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { neighborhoodId } = req.params;
        const updatedNeighborhood = yield neighborhoods_model_1.default.findByIdAndUpdate(neighborhoodId, req.body, { new: true });
        res.json(updatedNeighborhood);
    }
    catch (err) {
        err.ctrl = exports.updateNeighborhood;
        next(err);
    }
});
exports.updateNeighborhood = updateNeighborhood;
const deleteNeighborhood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { neighborhoodId } = req.params;
        const neighborhood = yield neighborhoods_model_1.default.findByIdAndDelete(neighborhoodId);
        res.json(neighborhood);
    }
    catch (err) {
        err.ctrl = exports.deleteNeighborhood;
        next(err);
    }
});
exports.deleteNeighborhood = deleteNeighborhood;
