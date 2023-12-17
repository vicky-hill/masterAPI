class Err extends Error {
    constructor(message, error, statusCode, validation, debug) {
        super(message);
        this.error = error;
        this.debug = debug;
        this.statusCode = statusCode;
        this.validation = validation;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = Err; 