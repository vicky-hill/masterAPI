import express, { Router } from 'express'
import { getDrinks, syncDrinks, updateDrink } from './drinks.controller'
import { isAdmin, protect } from '../utils/middleware'

const router: Router = express.Router();

/* ====================================
   @ /drinks
==================================== */

router.route('/').get(getDrinks)

router.route('/:drinkId').put(protect, isAdmin, updateDrink)

router.route('/sync').get(syncDrinks)


export default router;