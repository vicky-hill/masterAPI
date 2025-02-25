import express from 'express'
import { createList, deleteList, getList, getLists, updateList } from './test.controller'

const router: any = express.Router()

/* ====================================
   Users @ api/lesprit/test
==================================== */

router.route('/').get(getLists)
router.route('/').post(createList)

router.route('/:listId').get(getList)
router.route('/:listId').put(updateList)
router.route('/:listId').delete(deleteList)

export default router;




// Option with protect
// ========================================


// import express from 'express'
// import { createList, deleteList, getList, getLists, updateList } from './test.controller'
// import { protect } from '../utils/middleware'

// const router: any = express.Router()

// /* ====================================
//    Users @ api/lesprit/test
// ==================================== */

// router.route('/').get(protect, getLists)
// router.route('/').post(protect, createList)

// router.route('/:listId').get(protect, getList)
// router.route('/:listId').put(protect, updateList)
// router.route('/:listId').delete(protect, deleteList)

// export default router;
