const Err = require('./errorHandler')

const checkResource = (resource, name, errorCode, message) => {
    const errorMessage = message || `${name.charAt(0).toUpperCase() + name.slice(1)} not found`;
    
    if (!resource) {         
        const error = new Err(errorMessage, null, 404, null, null, errorCode);
        console.log('error', error)
        throw error;
    }
}

module.exports = checkResource; 