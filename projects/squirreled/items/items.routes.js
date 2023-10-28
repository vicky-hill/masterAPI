const express = require('express');
const router = express.Router();

const itemCtrl = require('./items.controller');

/**
 * @get api/squirreled/items - get all items
 * @post api/squirreled/items - create new item
 */
router
    .route('/')
    .get(itemCtrl.getItems)
    .post(itemCtrl.saveItem)

/** 
* @get api/squirreled/items/auth - get image kit auth
* @put api/squirreled/items/move - move multiple items
* @put api/squirreled/items/trash - trash multiple items
* @put api/squirreled/items/:id/move - move one item
* @put api/squirreled/items/:id/trash - trash one item
*/
router.route('/auth').get(itemCtrl.imageKitAuth)
router.route('/move').put(itemCtrl.moveItems);
router.route('/trash').put(itemCtrl.trashItems);
router.route('/:id/move').put(itemCtrl.moveItem);
router.route('/:id/trash').put(itemCtrl.trashItem);

/**
 * @get api/squirreled/items/:id - get item by id
 * @put api/squirreled/items/:id - update item
 * @delete api/squirreled/items/:id - delete item
 */
router
    .route('/:id')
    .get(itemCtrl.getItem)
    .put(itemCtrl.updateItem)
    .delete(itemCtrl.deleteItem)




module.exports = router; 