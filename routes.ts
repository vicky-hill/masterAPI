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
import snapplist_neighborhoodRoutes from './projects/snapplist/neighborhoods/neighborhoods.routes'
import snapplist_categoryRoutes from './projects/snapplist/categories/categories.routes'
import snapplist_userRoutes from './projects/snapplist/users/users.routes'

router.use('/api/snapplist/places', snapplist_placeRoutes)
router.use('/api/snapplist/neighborhoods', snapplist_neighborhoodRoutes)
router.use('/api/snapplist/categories', snapplist_categoryRoutes)
router.use('/api/snapplist/user', snapplist_userRoutes)


/* ===================================
   Hot Sauce
=================================== */
import hotsauce_userRoutes from './projects/hotsauce/users/user.routes'
import hotsauce_productRoutes from './projects/hotsauce/products/products.routes'
import hotsauce_cartRoutes from './projects/hotsauce/cart/cart.routes'

router.use('/api/hotsauce/user', hotsauce_userRoutes)
router.use('/api/hotsauce/products', hotsauce_productRoutes)
router.use('/api/hotsauce/cart', hotsauce_cartRoutes)


/* ===================================
   Lesprit
=================================== */
import lesprit_userRoutes from './projects/lesprit/users/users.routes'
import lesprit_wordRoutes from './projects/lesprit/words/words.routes'
import lesprit_admin_wordRoutes from './projects/lesprit/words/words.routes.admin'
import lesprit_listRoutes from './projects/lesprit/lists/lists.routes'
import lesprit_testRoutes from './projects/lesprit/test/test.routes'
import lesprite_user_verbRoutes from './projects/lesprit/verbs/verbs.routes.user'
import lesprite_admin_verbRoutes from './projects/lesprit/verbs/verbs.routes.admin'

router.use('/api/lesprit/user', lesprit_userRoutes)
router.use('/api/lesprit/words', lesprit_wordRoutes)
router.use('/api/lesprit/admin/words', lesprit_admin_wordRoutes)
router.use('/api/lesprit/lists', lesprit_listRoutes)
router.use('/api/lesprit/test', lesprit_testRoutes)
router.use('/api/lesprit/user/verbs', lesprite_user_verbRoutes)
router.use('/api/lesprit/admin/verbs', lesprite_admin_verbRoutes)


/* ===================================
   Fluent
=================================== */

import fluent_wordRoutes from './projects/fluent/words/words.routes'
import fluent_imageRoutes from './projects/fluent/images/images.routes'
import fluent_groupRoutes from './projects/fluent/groups/groups.routes'

router.use('/api/fluent/words', fluent_wordRoutes)
router.use('/api/fluent/images', fluent_imageRoutes)
router.use('/api/fluent/groups', fluent_groupRoutes)


export default router;
