import mongoose from 'mongoose'
import { FeatureAttributes } from '../../../types/reqdoc/attributes.types'

const FeatureSchema = new mongoose.Schema<FeatureAttributes>({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_Project',
        required: true
    },
    main_feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_Feature'
    },
    sort: {
        type: Number
    },
    deleted: {
        type: Date,
        required: false
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

FeatureSchema.virtual('sub_features', {
    ref: 'REQDOC_Feature',
    localField: '_id',
    foreignField: 'main_feature',
    justOne: false
});

FeatureSchema.virtual('reqs', {
    ref: 'REQDOC_Req',
    localField: '_id',
    foreignField: 'feature',
    justOne: false
})

FeatureSchema.virtual('type').get(function () {
    return this.main_feature ? 'sub' : 'main'
});

export default mongoose.model<FeatureAttributes>('REQDOC_Feature', FeatureSchema)