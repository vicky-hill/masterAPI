const checkResource = (resource, name, message) => {
    const errorMessage = message || `${name.charAt(0).toUpperCase() + name.slice(1)} not found`;
    
    if (!resource) {
        const error = new Error(errorMessage)
        error.statusCode = 404
        throw error;
    }
}

module.exports = checkResource; 