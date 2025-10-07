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

interface User {
    userId: string
    teamId: number
    email: string
    role: 'admin' | 'user'
    teams: Team[]
    team: Team
    deleted?: string | null
}

interface Team {
    teamId: number
    name: string
    deleted?: string | null
    users: User[]
}

interface Project {
    projectId: number
    teamId: number
    name: string
    projectKey: string
    key: string
    deleted?: string | null
    team: Team
}

interface Feature {
    featureId: number
    projectId: number
    parentId: number | null
    name: string
    sort: number
    deleted?: string | null
    subFeatures?: Feature[]
    mainFeature?: Feature
    project?: Project
}

interface Req {
    reqId: number
    projectId: number
    featureId: number
    latestReqId: number
    changedReq?: string | null
    key: string
    title: string
    text: string
    details?: string
    status?: 'passed' | 'failed' | null
    sort: number
    deleted?: string | null
    createdAt: string
    updatedAt: string
}