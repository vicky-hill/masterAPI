const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sort: {
        type: Number, 
    },
    status: {
        type: String,
        enum: ['active', 'inactive'] 
    },
    urlKey: {
        type: String,
        unique: true
    },
    images: {
        type: [
            {
                url: String,
                sort: Number,
            }
        ],
        default: []
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'TIKI_Category',
        required: true
    }
}, {
    timestamps: true,
    toJSON:{virtuals:true}, 
    toObject:{virtuals:true}
})

ProductSchema.virtual('image').get(function () {
    if (this.images && this.images.length > 0) {
        return this.images.sort((a, b) => a.sort - b.sort)[0].url
    }

    return null;
});


module.exports = mongoose.model('TIKI_Product', ProductSchema);