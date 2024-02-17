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

module.exports = Err; 