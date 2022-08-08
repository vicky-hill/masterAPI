const Bookmark = require('./bookmarks.model');
const User = require('../auth/auth.model');

/* ===================================
   Save Bookmark
=================================== */
async function saveBookmark(req, res) {
    try {
        const existingBookmarks = await Bookmark.find({ user: req.user.id });

        if (existingBookmarks.length > 6) {
            return res.status(403).json({ msg: 'You can\'t have more than 7 bookmarks' });
        }

        const body = {
            ...req.body,
            sort: existingBookmarks.length,
            user: req.user.id
        };

        const bookmark = await Bookmark.create(body);
        await User.findByIdAndUpdate(req.user.id, { $push: { bookmarks: bookmark._id } }, { new: true });

        res.status(201).json(bookmark);

    } catch (err) {
        console.log(err);
        res.status(500);
    }
}

/* ===================================
   Get Bookmarks
=================================== */
async function getBookmarks(req, res) {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id }).sort({ sort: 1});
        res.status(200).json(bookmarks);
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}

/* ===================================
   Update Bookmark
=================================== */
async function updateBookmark(req, res) {
    try {
        let bookmark = await Bookmark.findById(req.params.id);

        if (!bookmark) {
            return res.status(404).json({ msg: 'Bookmark not found' });
        }

        if (bookmark.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to update bookmark' });
        }

        bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(bookmark);

    } catch (err) {
        res.status(500);
        console.log(err)
    }
}

/* ===================================
   Delete Bookmark
=================================== */
async function deleteBookmark(req, res) {
    try {
        const bookmark = await Bookmark.findById(req.params.id);

        if (!bookmark) {
            return res.status(404).json({ msg: 'Bookmark not found' });
        }

        if (bookmark.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to delete bookmark' });
        }

        if (bookmark.primary) {
            return res.status(403).json({ msg: `${bookmark.name} holds all your photos and cannot be deleted` })
        }

        bookmark.remove();

        res.status(200).json(bookmark);


    } catch (err) {
        console.log(err);
        res.status(500)
    }
}

/* ===================================
   Sort Bookmarks
=================================== */
async function sortBookmarks(req, res) {
    try {
        const sortedBookmarks = [];

        const sortAndReturnBookmarks = new Promise((resolve, reject) => {
            req.body.forEach(async (bm, index, array) => {
                const bookmark = await Bookmark.findByIdAndUpdate(bm._id, { sort: bm.sort }, { new: true });
                sortedBookmarks.push(bookmark);
                if (sortedBookmarks.length === req.body.length) {
                    resolve(sortedBookmarks.sort((a, b) => a.sort - b.sort));
                }
            });
        });
        

        sortAndReturnBookmarks.then((sortedBookmarks) => {
            res.status(200).json(sortedBookmarks);
        });

        // res.status(200).json({ msg: "All good"})

    } catch (err) {
        console.log(err);
        res.status(500)
    }
}


module.exports = {
    saveBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark,
    sortBookmarks
}