import express, { Router } from 'express'
import { getPosts } from './posts.controller'

const router: Router = express.Router();

/* ====================================
   @ /posts
==================================== */

router.route('/').get(getPosts)


export default router;
