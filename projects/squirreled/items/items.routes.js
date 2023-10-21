const express = require('express');
const router = express.Router();

const itemCtrl = require('./items.controller');

/**
 * @route api/squirreled/items
 * @get Get all items
 * @post Save item
 */
router
    .route('/')
    .get(itemCtrl.getItems)
    .post(itemCtrl.saveItem)


/** 
* @route api/squirreled/items/:id/move
*/
router.route('/:id/move').put(itemCtrl.moveItem);



/**
 * @route api/squirreled/items/:id
 * @get Get one item
 * @put Update item
 * @delete Delete item
 */
router
    .route('/:id')
    .get(itemCtrl.getItem)
    .put(itemCtrl.updateItem)
    .delete(itemCtrl.deleteItem)






module.exports = router; 