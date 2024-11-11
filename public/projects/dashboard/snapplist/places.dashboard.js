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
exports.deletePlace = exports.updatePlace = exports.createPlace = exports.getPlace = exports.getPlaces = void 0;
const places_model_1 = __importDefault(require("../../snapplist/places/places.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getPlaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const places = yield places_model_1.default.find();
        res.json(places);
    }
    catch (err) {
        err.ctrl = exports.getPlaces;
        next(err);
    }
});
exports.getPlaces = getPlaces;
const getPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { placeId } = req.params;
        const place = yield places_model_1.default.findById(placeId);
        if (!place)
            return (0, throwError_1.default)('Place not found');
        res.json(place);
    }
    catch (err) {
        err.ctrl = exports.getPlace;
        next(err);
    }
});
exports.getPlace = getPlace;
const createPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const place = yield places_model_1.default.create(req.body);
        res.json(place);
    }
    catch (err) {
        err.ctrl = exports.createPlace;
        next(err);
    }
});
exports.createPlace = createPlace;
const updatePlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { placeId } = req.params;
        const updatedPlace = yield places_model_1.default.findByIdAndUpdate(placeId, req.body, { new: true });
        res.json(updatedPlace);
    }
    catch (err) {
        err.ctrl = exports.updatePlace;
        next(err);
    }
});
exports.updatePlace = updatePlace;
const deletePlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { placeId } = req.params;
        const place = yield places_model_1.default.findByIdAndDelete(placeId);
        res.json(place);
    }
    catch (err) {
        err.ctrl = exports.deletePlace;
        next(err);
    }
});
exports.deletePlace = deletePlace;
