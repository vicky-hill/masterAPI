const express = require('express')
const router = express.Router()
const { protect } = require('../protect')

const itemCtrl = require('./items.controller');

router.route('/assign').get(protect, itemCtrl.assignItems);

/**
 * @get api/squirreled/items - get all items
 * @post api/squirreled/items - create new item
 */
router
    .route('/')
    .get(protect, itemCtrl.getItems)
    .post(protect, itemCtrl.createItem)

/** 
* @get api/squirreled/items/auth - get image kit auth
* @put api/squirreled/items/move - move multiple items
* @put api/squirreled/items/trash - trash multiple items
* @put api/squirreled/items/:id/move - move one item
* @put api/squirreled/items/:id/trash - trash one item
*/
router.route('/auth').get(protect, itemCtrl.imageKitAuth)
router.route('/move').put(protect, itemCtrl.moveItems);
router.route('/trash').put(protect, itemCtrl.trashItems);
router.route('/:id/move').put(protect, itemCtrl.moveItem);
router.route('/:id/trash').put(protect, itemCtrl.trashItem);

/**
 * @get api/squirreled/items/:id - get item by id
 * @put api/squirreled/items/:id - update item
 * @delete api/squirreled/items/:id - delete item
 */
router
    .route('/:id')
    .get(protect, itemCtrl.getItem)
    .put(protect, itemCtrl.updateItem)
    .delete(protect, itemCtrl.deleteItem)




module.exports = router; 