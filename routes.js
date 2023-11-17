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


// Check backend health
router.get('/health-check', (req, res) => res.send('Great Health'));

/* ===================================
   Lesprit
=================================== */

// Mount auth routes @ api/lesprit/user
router.use('/api/lesprit/user', lesprit_authRoutes)

// Mount list routes @ api/lesprit/lists
router.use('/api/lesprit/lists', lesprit_listRoutes)

// Mount word routes @ api/lesprit/words
router.use('/api/lesprit/words', lesprit_wordRoutes)


/* ===================================
   Minite
=================================== */

// Mount auth routes @ api/minite/user
router.use('/api/minite/user', minite_authRoutes)

// Mount upload routes @ api/minite/upload
router.use('/api/minite/upload', minite_uploadRoutes)

// Mount image routes @ api/minite/image
router.use('/api/minite/image', minite_imageRoutes)

// Mount group routes @ api/minite/group
router.use('/api/minite/group', minite_groupRoutes)

// Mount bookmarks routes @ api/minite/bookmark
router.use('/api/minite/bookmark', minite_bookmarkRoutes)

// Mount events routes @ api/minite/event
router.use('/api/minite/event', minite_eventRoutes)

/* ===================================
   Hot Sauce
=================================== */

// Mount product routes @ api/hotsauce/products
router.use('/api/hotsauce/products', hotsauce_productRoutes)

// Mount user routes @ api/hotsauce/user
router.use('/api/hotsauce/user', hotsauce_userRoutes)

// Mount user routes @ api/hotsauce/cart
router.use('/api/hotsauce/cart', hotsauce_cartRoutes)


/* ===================================
   Squirreled
=================================== */

// Mount item routes @ api/squirreled/items
router.use('/api/squirreled/items', squirrled_itemRoutes)

// Mount item routes @ api/squirreled/locations
router.use('/api/squirreled/locations', squirrled_locationRoutes)

// Mount item routes @ api/squirreled/user
router.use('/api/squirreled/user', squirrled_userRoutes)


/* ===================================
   Reqdoc
=================================== */

// Mount projects routes @ api/reqdoc/projects
router.use('/api/reqdoc/projects', reqdoc_projectRoutes)

// Mount features routes @ api/reqdoc/features
router.use('/api/reqdoc/features', reqdoc_featuresRoutes)

// Mount reqs routes @ api/reqdoc/reqs
router.use('/api/reqdoc/reqs', reqdoc_reqsRoutes)



module.exports = router;


