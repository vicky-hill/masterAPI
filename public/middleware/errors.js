"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Err = require('../utils/errorHandler');
const onError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let error = Object.assign({}, err);
    let validation = {};
    error.message = err.message;
    // Wrong mongoose object ID Error
    if (err.name === 'CastError') {
        const errorMessage = `Invalid mongoose objectId for field: ${err.path}`;
        error = new Err(null, errorMessage, 400);
    }
    // Yup validation error
    if (err.name === 'ValidationError' && err.inner) {
        const message = 'Please fill out all required fields';
        const missing = err.inner.map((error) => error.path);
        const missingFields = missing.join(', ');
        const plural = missing.length > 1;
        const errorMessage = `req.body is missing or received wrong values for ${plural ? 'these' : 'this'} required field${plural ? 's' : ''}: ${missingFields}`;
        err.inner.forEach((error) => validation[error.path] = error.message);
        error = new Err(message, errorMessage, 400, validation, null, err.errorCode);
    }
    let payload = {
        name: err.name && err.name !== "Error" ? err.name : null,
        error: error.error,
        message: error.message,
        debug: error.debug,
        validation: error.validation,
        status: error.statusCode,
        errorCode: error.errorCode,
        controller: error.controller
    };
    Object.keys(payload).forEach(key => {
        if (payload[key] === 'null' || !payload[key]) {
            delete payload[key];
        }
    });
    res.status(err.statusCode).json(payload);
};
exports.default = onError;
