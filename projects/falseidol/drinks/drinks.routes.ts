import express, { Router } from 'express'
import { createDrink, getAllDrinks, getDrinks, requestDrink, syncDrinks, updateDrink } from './drinks.controller'
import { isAdmin, protect } from '../utils/middleware'

const router: Router = express.Router();

/* ====================================
   @ /drinks
==================================== */

router.route('/dashboard/drinks').get(protect, getAllDrinks)

router.route('/').get(protect, getDrinks)
router.route('/').post(createDrink)

router.route('/request/:drinkId').put(protect, requestDrink)

router.route('/:drinkId').put(protect, isAdmin, updateDrink)

router.route('/sync').get(syncDrinks)


export default router;