const express = require('express')
const router = express.Router()

const lesprit_authRoutes = require('./projects/lesprit/auth/auth.routes')
const lesprit_listRoutes = require('./projects/lesprit/lists/lists.routes')
const lesprit_wordRoutes = require('./projects/lesprit/words/words.routes')

const minite_authRoutes = require('./projects/minite/auth/auth.routes')
const minite_uploadRoutes = require('./projects/minite/upload/upload.routes')
const minite_imageRoutes = require('./projects/minite/image/image.routes')
const minite_groupRoutes = require('./projects/minite/group/group.routes')
const minite_bookmarkRoutes = require('./projects/minite/bookmarks/bookmarks.routes')
const minite_eventRoutes = require('./projects/minite/events/event.routes')

const hotsauce_productRoutes = require('./projects/hotsauce/products/products.routes')
const hotsauce_userRoutes = require('./projects/hotsauce/users/users.routes')
const hotsauce_cartRoutes = require('./projects/hotsauce/carts/carts.routes')

const squirrled_itemRoutes = require('./projects/squirreled/items/items.routes')
const squirrled_locationRoutes = require('./projects/squirreled/locations/locations.routes')
const squirrled_userRoutes = require('./projects/squirreled/users/users.routes')

const reqdoc_projectRoutes = require('./projects/reqdoc/projects/projects.routes')
const reqdoc_featuresRoutes = require('./projects/reqdoc/features/features.routes')
const reqdoc_reqsRoutes = require('./projects/reqdoc/reqs/reqs.routes')
const reqdoc_stepRoutes = require('./projects/reqdoc/steps/steps.routes')

const tiki_userRoutes = require('./projects/tiki/users/users.routes')
const tiki_productRoutes = require('./projects/tiki/products/products.routes')
const tiki_cartRoutes = require('./projects/tiki/carts/carts.routes')
const tiki_categoryRoutes = require('./projects/tiki/categories/categories.routes')
const tiki_orders = require('./projects/tiki/orders/orders.routes')



// Check backend health
router.get('/health-check', (req, res) => res.send('Great Health'));

/* ===================================
   Lesprit
=================================== */
router.use('/api/lesprit/user', lesprit_authRoutes)
router.use('/api/lesprit/lists', lesprit_listRoutes)
router.use('/api/lesprit/words', lesprit_wordRoutes)


/* ===================================
   Minite
=================================== */
router.use('/api/minite/user', minite_authRoutes)
router.use('/api/minite/upload', minite_uploadRoutes)
router.use('/api/minite/image', minite_imageRoutes)
router.use('/api/minite/group', minite_groupRoutes)
router.use('/api/minite/bookmark', minite_bookmarkRoutes)
router.use('/api/minite/event', minite_eventRoutes)

/* ===================================
   Hot Sauce
=================================== */
router.use('/api/hotsauce/products', hotsauce_productRoutes)
router.use('/api/hotsauce/user', hotsauce_userRoutes)
router.use('/api/hotsauce/cart', hotsauce_cartRoutes)


/* ===================================
   Squirreled
=================================== */
router.use('/api/squirreled/items', squirrled_itemRoutes)
router.use('/api/squirreled/locations', squirrled_locationRoutes)
router.use('/api/squirreled/user', squirrled_userRoutes)


/* ===================================
   Reqdoc
=================================== */
router.use('/api/reqdoc/projects', reqdoc_projectRoutes)
router.use('/api/reqdoc/features', reqdoc_featuresRoutes)
router.use('/api/reqdoc/reqs', reqdoc_reqsRoutes)
router.use('/api/reqdoc/steps', reqdoc_stepRoutes)


/* ===================================
   Tiki
=================================== */
router.use('/api/tiki/user', tiki_userRoutes)
router.use('/api/tiki/products', tiki_productRoutes)
router.use('/api/tiki/cart', tiki_cartRoutes)
router.use('/api/tiki/categories', tiki_categoryRoutes)
router.use('/api/tiki/orders', tiki_orders)


module.exports = router;


