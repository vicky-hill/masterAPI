const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.routes');
const uploadRoutes = require('./upload/upload.routes');
const imageRoutes = require('./image/image.routes');
const groupRoutes = require('./group/group.routes');
const bookmarkRoutes = require('./bookmarks/bookmarks.routes');

// Mount auth routes @ api/user
router.use('/api/user', authRoutes)

// Mount upload routes @ api/upload
router.use('/api/upload', uploadRoutes)

// Mount image routes @ api/image
router.use('/api/image', imageRoutes)

// Mount group routes @ api/group
router.use('/api/group', groupRoutes)

// Mount bookmarks routes @ api/bookmark
router.use('/api/bookmark', bookmarkRoutes)


// Check backend health
router.get('/health-check', (req, res) => res.send('Great Health'));



module.exports = router;