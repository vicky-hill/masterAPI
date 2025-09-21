import { Schema, model, Document, ObjectId, LeanDocument } from 'mongoose'


interface CreateImage {
    url: string
    file: string
}

interface UpdateImage {
    url: string
    file: string
}

interface CreateWord {
    english: string
    french?: string
    italian?: string
    spanish?: string
    image?: ObjectId
}

interface CreateGroup {
    name: string
}

interface UpdateGroup {
    name: string
}