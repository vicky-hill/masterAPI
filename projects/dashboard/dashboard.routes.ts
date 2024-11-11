import express from 'express'
import { getCollections } from './dashboard.controller'

const router: any = express.Router()

router.route('/:project').get(getCollections)

export default router;