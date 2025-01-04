import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './products.controller'

const router: any = express.Router()

/* ====================================
   Users @ api/hotsauce/products
==================================== */

router.route('/').get(getProducts)
router.route('/').post(createProduct)

router.route('/:productId').get(getProduct)
router.route('/:productId').put(updateProduct)
router.route('/:productId').delete(deleteProduct)


export default router;