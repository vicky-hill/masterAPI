import express from 'express'
import { getAllGroups, getNeatGroups } from './groups.controller'

const router = express.Router()

/* ====================================
   @ /fluent/groups
==================================== */

router.get('/', getAllGroups);
router.get('/neat', getNeatGroups)

export default router;