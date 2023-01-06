const express = require('express');
const router = express.Router();

const lesprit_authRoutes = require('./projects/lesprit/auth/auth.routes');
const lesprit_listRoutes = require('./projects/lesprit/lists/lists.routes');
const lesprit_wordRoutes = require('./projects/lesprit/words/words.routes');

const minite_authRoutes = require('./projects/minite/auth/auth.routes');
const minite_uploadRoutes = require('./projects/minite/upload/upload.routes');
const minite_imageRoutes = require('./projects/minite/image/image.routes');
const minite_groupRoutes = require('./projects/minite/group/group.routes');
const minite_bookmarkRoutes = require('./projects/minite/bookmarks/bookmarks.routes');

const hotsauce_productRoutes = require('./projects/hotsauce/products/products.routes');
const hotsauce_userRoutes = require('./projects/hotsauce/users/users.routes');


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

/* ===================================
   Hot Sauce
=================================== */

// Mount product routes @ api/hotsauce/products
router.use('/api/hotsauce/products', hotsauce_productRoutes)

// Mount user routes @ api/hotsauce/user
router.use('/api/hotsauce/user', hotsauce_userRoutes)


module.exports = router;


