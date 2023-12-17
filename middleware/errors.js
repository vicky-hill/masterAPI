const Err = require('../utils/errorHandler')

const onError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let error = {...err};
    let validation = {}
    
    error.message = err.message;

    // Wrong mongoose object ID Error
    if (err.name === 'CastError') {
        const message = `We're unable to locate the requested content at the moment.`;
        const errorMessage = `Invalid mongoose objectId, please verify that the passed id is a valid objectId, path: ${err.path}`;
        error = new Err(message, errorMessage, 400);
    }

    // Handling mongoose validation error
    if (err.name === 'ValidationError') {
        const message = 'Please fill out all required fields'

        for (let prop in err.errors) {
            validation[prop] = err.errors[prop].message
        }
        
        error = new Err(message, message, 400, validation)
    }

    const payload = {
        error: error.error,
        message: error.message, 
        debug: error.debug,
        validation: error.validation,
        status: error.statusCode
    }

    if (err.name && err.name !== "Error") payload.name = err.name

    res.status(err.statusCode).json(payload);
}

module.exports = onError; 