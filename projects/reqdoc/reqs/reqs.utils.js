const Req = require('./reqs.model')
const throwError = require('../../../utils/throwError')
const { history, steps } = require('../utils/populate')

const getReqByID = async function (reqID) {
    const product = await Req.findById(reqID)
        .populate([history, steps]);

    !product && throwError(`Could not find req by ID: ${reqID}`);

    return product;
}

module.exports = {
    getReqByID
}