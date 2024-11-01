class Err extends Error {
    error: any
    debug: any
    statusCode: any
    validation: any
    errorCode: any

    constructor(message: string, error: any, statusCode: any, validation: any, debug: any, errorCode: any) {
        super(message);
        this.error = error;
        this.debug = debug;
        this.statusCode = statusCode;
        this.validation = validation;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default Err; 