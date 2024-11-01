import { Schema, model, Document, ObjectId } from 'mongoose'

interface ReqCommentAttributes extends Document {
    user: ObjectId
    text: string
    edited: boolean
    deleted: date
    createdAt: string
    updatedAt: string
}

interface ReqAttributes extends Document {
    key: string
    title?: string
    text: string
    project: ObjectId
    feature: FeatureAttributes
    status: 'passed' | 'failed' | null
    changed_req: string
    latest_req?: ObjectId
    deleted?: date
    sort: number
    details: string
    createdAt: string
    updatedAt: string
    comments: ReqCommentAttributes[]
    history?: ReqAttributes[]
}

interface FeatureAttributes extends Document {
    name: string
    project: ProjectAttributes
    main_feature?: ObjectId
    sort: number
    deleted?: date
    reqs: ReqAttributes[]
    sub_features: FeatureAttributes[]
}

interface ProjectAttributes extends Document {
    name: string
    slug: string
    key: string
    team: TeamAttributes
    deleted?: date
    first_feature: FeatureAttributes
    features: FeatureAttributes[]
}

interface TeamAttributes extends Document {
    name: string
    users: [{
        user: UserAttributes
        role: 'admin' | 'user'
    }]
    deleted?: date
}

interface UserAttributes extends Document {
    firebaseID: string
    email: string
    name?: string
    team: ObjectId
    role: 'admin' | 'user'
    type: 'admin' | 'user'
    deleted?: date
}