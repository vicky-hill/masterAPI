import express, { Router } from 'express'
import { addComment, deleteComment, editComment } from './comments.controller'
import { protect } from '../utils/middleware';

const router: Router = express.Router();

/* ====================================
   @ /comments
==================================== */

router.route('/req/:reqId').post(protect, addComment)
router.route('/req/:commentID').put(protect, editComment)
router.route('/req/:commentID').delete(protect, deleteComment)


export default router;
