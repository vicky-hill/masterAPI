"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Err extends Error {
    constructor(message, error, statusCode, validation, debug, errorCode) {
        super(message);
        this.error = error;
        this.debug = debug;
        this.statusCode = statusCode;
        this.validation = validation;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = Err;
