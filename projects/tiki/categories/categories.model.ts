import mongoose from 'mongoose'
import { CategoryAttributes } from '../../../types/tiki/attribute.types'

const CategorySchema = new mongoose.Schema<CategoryAttributes>({
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

CategorySchema.virtual('products', {
    ref: 'Tiki_Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

CategorySchema.virtual('count').get(function () {
    return this.products?.length;
});

export default mongoose.model<CategoryAttributes>('Tiki_Category', CategorySchema)