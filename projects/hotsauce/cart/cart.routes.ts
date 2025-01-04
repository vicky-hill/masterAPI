import express from 'express'
import { addToCart, getCart } from './cart.controller'
import { protect } from '../utils/middleware'

const router: any = express.Router()

/* ====================================
   Users @ api/hotsauce/products
==================================== */

router.route('/').get(protect, getCart)
router.route('/').post(protect, addToCart)




export default router;