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
/**
 * Throw Error
 * @param {string} message - Message, should be end user friendly
 * @param {object} options - More options for customized errror
 * @param {property} options.status - status code
 * @param {property} options.error - Message, for further information on error
 * @param {property} options.debug - Debug information
 */
const throwError = (message, options) => {
    const notFoundStrings = ['not found', 'not find', 'cannot be found', 'does not exist'];
    let statusCode = options && options.status || 500;
    // check if message includes any of the above and set status to 404
    if (notFoundStrings.some(string => message.includes(string))) {
        statusCode = 404;
    }
    const newError = new Err(message, options === null || options === void 0 ? void 0 : options.error, statusCode, null, options === null || options === void 0 ? void 0 : options.debug, null);
    if (Error.captureStackTrace) {
        Error.captureStackTrace(newError, throwError); // Avoid the throwError function itself in the stack
    }
    const stack = newError.stack || '';
    const functionNameMatch = stack.match(/at (\w+)/); // Match the first function name after 'at'
    const functionName = functionNameMatch ? functionNameMatch[1] : 'Unknown function';
    console.log('function name', functionName);
    throw newError;
};
exports.default = throwError;
