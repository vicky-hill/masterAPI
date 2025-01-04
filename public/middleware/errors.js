"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const controllers_1 = require("../utils/controllers");
const onError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let error = Object.assign({}, err);
    let validation = {};
    error.message = err.message;
    // Wrong mongoose object ID Error
    if (err.name === 'CastError') {
        const errorMessage = `Invalid mongoose objectId for field: ${err.path}`;
        error = new errorHandler_1.default('Invalid objectId', errorMessage, 400, null, null, null);
    }
    // Yup validation error
    if (err.name === 'ValidationError' && err.inner) {
        const message = 'Please fill out all required fields';
        const missing = err.inner.map((error) => error.path);
        const missingFields = missing.join(', ');
        const plural = missing.length > 1;
        const errorMessage = `req.body is missing or received wrong values for ${plural ? 'these' : 'this'} required field${plural ? 's' : ''}: ${missingFields}`;
        err.inner.forEach((error) => validation[error.path] = error.message);
        error = new errorHandler_1.default(message, errorMessage, 400, validation, null, err.errorCode);
    }
    const controller = controllers_1.controllers.find((ctrl) => req.originalUrl.startsWith(ctrl.endpoint) && req.method === ctrl.method);
    let payload = {
        name: err.name && err.name !== "Error" ? err.name : null,
        error: error.error,
        message: error.message,
        debug: error.debug,
        validation: error.validation,
        status: error.statusCode,
        errorCode: error.errorCode,
        controller: controller === null || controller === void 0 ? void 0 : controller.controller,
        endpoint: req.originalUrl,
        method: req.method
    };
    Object.keys(payload).forEach(key => {
        if (payload[key] === 'null' || !payload[key]) {
            delete payload[key];
        }
    });
    res.status(err.statusCode).json(payload);
};
exports.default = onError;
