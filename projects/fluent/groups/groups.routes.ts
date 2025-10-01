import express from 'express'
import { getAllGroups } from './groups.controller'

const router = express.Router()

/* ====================================
   @ /fluent/groups
==================================== */

router.get('/', getAllGroups);


export default router;