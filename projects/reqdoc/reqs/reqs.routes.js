const express = require('express')
const router = express.Router()

const reqCtrl = require('./reqs.controller');

/**
 * @post api/reqdoc/reqs - create new req
 */
router
    .route('/')
    .post(reqCtrl.createReq)

/** 
* @post api/reqdoc/reqs/:reqID/change - change a req
*/
router.route('/:reqID/change').put(reqCtrl.changeReq)

/**
 * @get api/reqdoc/reqs/:id - get location by id
 */
router
    .route('/:project')
    .get(reqCtrl.getReqs)



module.exports = router; 