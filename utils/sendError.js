const Err = require('./errorHandler')

const sendError = (next, status, { message, error, validation, debug }) => {
    
    next(new Err(message, error, status, validation, debug));
}

module.exports = sendError; 