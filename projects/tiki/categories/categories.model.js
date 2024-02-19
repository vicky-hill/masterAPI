const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    sort: {
        type: Number
    },
}, {
    timestamps: true,
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
})

CategorySchema.virtual('products', {
    ref: 'TIKI_Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

CategorySchema.virtual('count').get(function () {
    return this.products?.length;
});
module.exports = mongoose.model('TIKI_Category', CategorySchema);