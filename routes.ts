import express, { Router} from 'express'
const router: Router = express.Router()

// Check backend health
router.get('/health-check', (req, res) => { res.send('Great Health')})

/* ===================================
   Reqdoc
=================================== */
import reqdoc_projectRoutes from './projects/reqdoc/projects/projects.routes'
import reqdoc_featuresRoutes from './projects/reqdoc/features/features.routes'
import reqdoc_reqsRoutes from './projects/reqdoc/reqs/reqs.routes'
import reqdoc_users from './projects/reqdoc/users/users.routes'
import reqdoc_teams from './projects/reqdoc/teams/teams.routes'
import reqdoc_admin from './projects/reqdoc/admin/admin.routes'

router.use('/api/reqdoc/projects', reqdoc_projectRoutes)
router.use('/api/reqdoc/features', reqdoc_featuresRoutes)
router.use('/api/reqdoc/reqs', reqdoc_reqsRoutes)
router.use('/api/reqdoc/user', reqdoc_users)
router.use('/api/reqdoc/teams', reqdoc_teams)
router.use('/api/reqdoc/admin', reqdoc_admin)



/* ===================================
   Hot Key
=================================== */

import hotkeysnippets_noteRoutes from './projects/hotkey/notes/notes.routes'

router.use('/api/hotkey/notes', hotkeysnippets_noteRoutes)

/* ===================================
   Snapplist
=================================== */
import snapplist_placeRoutes from './projects/snapplist/places/places.routes'

router.use('/api/snapplist/places', snapplist_placeRoutes)

export default router;
