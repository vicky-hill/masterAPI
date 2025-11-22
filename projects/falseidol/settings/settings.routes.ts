import express, { Router } from 'express'
import { getSettings, updateSetting } from './settings.controller'

const router: Router = express.Router();

/* ====================================
   @ /settings
==================================== */

router.route('/').get(getSettings)

router.route('/:settingId').put(updateSetting)


export default router;