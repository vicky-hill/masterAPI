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
* @put api/reqdoc/reqs/sort - sort reqs
* @post api/reqdoc/reqs/:reqID/change - change a req
* @post api/reqdoc/reqs/:reqID/update - update a req
* @post api/reqdoc/reqs/:reqID/retrieve - get a single req
*/
router.route('/sort').put(reqCtrl.sortReqs)
router.route('/:reqID/change').put(reqCtrl.changeReq)
router.route('/:reqID/update').put(reqCtrl.updateReq)
router.route('/:reqID/retrieve').get(reqCtrl.getReq)
router.route('/:reqID/delete').delete(reqCtrl.deleteReq)

/**
 * @get api/reqdoc/reqs/:id - get location by id
 */
router.route('/:featureID').get(reqCtrl.getReqs)




module.exports = router; 