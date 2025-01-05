import express from 'express'
import { protect } from '../utils/middleware'
import { getLists, getList, createList, updateList, deleteList, deleteUserLists } from './lists.controller'

const router: any = express.Router()

/* ====================================
   Users @ api/lesprit/lists
==================================== */

router.route('/').get(protect, getLists)
router.route('/').post(protect, createList)

router.route('/:wordId').get(protect, getList)
router.route('/:wordId').post(protect, createList)
router.route('/:wordId').put(protect, updateList)
router.route('/:wordId').delete(protect, deleteList)

export default router;