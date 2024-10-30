import express, { Router} from 'express'
const router: Router = express.Router()

// Check backend health
router.get('/health-check', (req, res) => { res.send('Great Health')})

/* ===================================
   Hot Key
=================================== */

import hotkeysnippets_noteRoutes from './projects/hotkey/notes/notes.routes'

router.use('/api/hotkey/notes', hotkeysnippets_noteRoutes)

export default router;
