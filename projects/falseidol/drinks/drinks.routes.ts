import express, { Router } from 'express'
import { getDrinks, syncDrinks } from './drinks.controller'

const router: Router = express.Router();

/* ====================================
   @ /drinks
==================================== */

router.route('/').get(getDrinks)
router.route('/sync').get(syncDrinks)


export default router;