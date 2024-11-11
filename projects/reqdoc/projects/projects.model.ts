import mongoose from 'mongoose'
import { ProjectAttributes } from '../../../types/reqdoc/attributes.types'

const ProjectSchema = new mongoose.Schema<ProjectAttributes>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reqdoc_Team'
    },
    deleted: {
        type: Date,
        required: false
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

ProjectSchema.virtual('features', {
    ref: 'Reqdoc_Feature',
    localField: '_id',
    foreignField: 'project',
    justOne: false
});

ProjectSchema.virtual('first_feature').get(function () {
    if (this.features && this.features.length > 0) {
        return this.features[0]._id
    }

    return null;
});

export default mongoose.model<ProjectAttributes>('Reqdoc_Project', ProjectSchema)