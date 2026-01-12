import { Schema, model, Document, ObjectId } from 'mongoose'



interface UpdateProject {
    name: string
    slug: string
}

interface CreateReq {
    title: string
    text: string
    feature: string
}

interface UpdateReq {
    title: string
    text: string
    details: string
}

interface ChangeReq {
    title: string
    text: string
}

interface SortReqs {
    [{
        _id: string,
        sort: number
    }]
}

interface AddComment {
    text: string
}

interface EditComment {
    text: string
}

interface CreateTeam {
    name: string
    user: string
}

interface UpdateTeam {
    name: string
}

interface CreateUser {
    email: string
    firebaseID: string
}

interface InviteUser {
    team: string
    email: string
    firebaseID: string
}

interface UpdateUser {
    name: string
}

