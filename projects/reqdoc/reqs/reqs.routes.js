const express = require('express')
const router = express.Router()
const reqCtrl = require('./reqs.controller')

/**
 * @post api/reqdoc/reqs - create new req
 */
router
    .route('/')
    .post(reqCtrl.createReq)

/** 
* @post api/reqdoc/reqs/sort - update sort of reqs
* @post api/reqdoc/reqs/:reqID/change - change a req
*/
router.route('/sort', reqCtrl)
router.route('/:reqID/change').put(reqCtrl.changeReq)
router.route('/:reqID/retrieve').get(reqCtrl.getReq)

/**
 * @get api/reqdoc/reqs/:id - get location by id
 */
router
    .route('/:feature')
    .get(reqCtrl.getReqs)



module.exports = router; 