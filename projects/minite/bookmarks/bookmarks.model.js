const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    sort: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Add a name for your bookmark']
    }, 
    icon: {
        type: String,
        required: [true, 'Add an icon for your bookmark']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    primary: {
        type: Boolean,
        immutable: true,
        default: false
    }
})

BookmarkSchema.pre('remove', async function (next) {
    await this.model('Image').updateMany({ bookmark: this._id }, { bookmark: null});
	next();
})


module.exports = mongoose.model('Minite_Bookmark', BookmarkSchema);