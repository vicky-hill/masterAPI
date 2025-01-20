import express from 'express'
import { protect } from '../utils/middleware'
import { getLists, getList, createList, updateList, deleteList, deleteUserLists, getPublicLists, addListToUser, removeListFromUser } from './lists.controller'

const router: any = express.Router()

/* ====================================
   Users @ api/lesprit/lists
==================================== */

router.route('/').get(protect, getLists)
router.route('/').post(protect, createList)

router.route('/public').get(protect, getPublicLists)
router.route('/public/add/:listId').put(protect, addListToUser)
router.route('/public/remove/:listId').put(protect, removeListFromUser)

router.route('/:listId').get(protect, getList)
router.route('/:listId').post(protect, createList)
router.route('/:listId').put(protect, updateList)
router.route('/:listId').delete(protect, deleteList)

export default router;