const mongoose = require('mongoose');
const slugify = require('slugify');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lesprit_User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: String
})

// Create list slug from the title
ListSchema.pre('save', function(next){
    this.slug = slugify(this.title, { lower: true });
    next();
});


// Cascade delete words when a list is deleted
ListSchema.pre('remove', async function(next) {
    await this.model('Lesprit_Word').deleteMany({ list: this._id});
    next();
})

module.exports = mongoose.model('Lesprit_List', ListSchema);