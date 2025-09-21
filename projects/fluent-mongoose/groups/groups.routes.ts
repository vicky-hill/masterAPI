import express, { Router } from 'express'
import { getGroups, getGroup, createGroup, updateGroup, deleteGroup } from './groups.controller'

const router: Router = express.Router();

/* ====================================
   @ api/fluent/groups
==================================== */

router.route('/').get(getGroups)
router.route('/').post(createGroup)

router.route('/:groupId').get( getGroup)
router.route('/:groupId').delete(deleteGroup)
router.route('/:groupId').put(updateGroup)

export default router;