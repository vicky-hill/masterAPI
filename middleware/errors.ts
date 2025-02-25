import Err from '../utils/errorHandler'
import { controllers } from '../utils/controllers'

const onError = (err: any, req: any, res: any, next: any) => {
    const notFoundStrings = ['not found', 'not find', 'cannot be found', 'does not exist'];

    err.statusCode = err.statusCode || 500;

    // check if message includes any of the above and set status to 404
    if (notFoundStrings.some(string => err.message.includes(string))) {
        err.statusCode = 404;
    }

    let error = { ...err };
    let validation: any = {}

    error.message = err.message;

    // Wrong mongoose object ID Error
    if (err.name === 'CastError') {
        const errorMessage = `Invalid mongoose objectId for field: ${err.path}`;
        error = new Err('Invalid objectId', errorMessage, 400, null, null, null);
    }

    // Yup validation error
    if (err.name === 'ValidationError' && err.inner) {

        const message = 'Please fill out all required fields'

        const missing = err.inner.map((error: any) => error.path);
        const missingFields = missing.join(', ');
        const plural = missing.length > 1;

        const errorMessage = `req.body is missing or received wrong values for ${plural ? 'these' : 'this'} required field${plural ? 's' : ''}: ${missingFields}`

        err.inner.forEach((error: any) => validation[error.path] = error.message);

        error = new Err(message, errorMessage, 400, validation, null, err.errorCode)
    }

    const controller: any = controllers.find((ctrl: any) => req.originalUrl.startsWith(ctrl.endpoint) && req.method === ctrl.method)

    let payload: any = {
        name: err.name && err.name !== "Error" ? err.name : null,
        error: error.error,
        message: error.message,
        debug: error.debug,
        validation: error.validation,
        status: error.statusCode,
        errorCode: error.errorCode,
        controller: controller?.controller,
        endpoint: req.originalUrl,
        method: req.method
    }

    Object.keys(payload).forEach(key => {
        if (payload[key] === 'null' || !payload[key]) {
            delete payload[key]
        }
    })

    res.status(err.statusCode).json(payload);
}

export default onError; 