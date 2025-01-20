import mongoose from 'mongoose'
import slugify from 'slugify'
import { ListAttributes } from '../../../types/lesprit/attribute.types'

const ListSchema = new mongoose.Schema<ListAttributes>({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    public: {
        type: Boolean,
        default: false
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


export default mongoose.model<ListAttributes>('Lesprit_List', ListSchema);