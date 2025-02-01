import mongoose from 'mongoose'
import slugify from 'slugify'
import { ListAttributes } from '../../../types/lesprit/attribute.types'

const ListSchema = new mongoose.Schema<ListAttributes>({
    title: {
        type: String,
        required: true
    },
    image: String,
    urlKey: String
}, {
    timestamps: true
});


ListSchema.pre('save', function(next){
    this.urlKey = slugify(this.title, { lower: true });
    next();
});


export default mongoose.model<ListAttributes>('Lesprit_Test', ListSchema);