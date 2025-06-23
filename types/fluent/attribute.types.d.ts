import { Schema, model, Document, ObjectId, LeanDocument } from 'mongoose'
import {ImageAttributes} from './attribute.types';

type Language = { foreign: string, native: string }

interface UserAttributes extends Document {
    _id: ObjectId
    firebaseId: string
    name: string
    email: string
    role: 'user' | 'admin'
    lists: ListAttributes[]
    languages: Language[]
    verbs: Verb[]
}

interface WordAttributes extends Document {
    _id: ObjectId
    english: string
    french?: string
    spanish?: string
    italian?: string
    image: ObjectId | ImageAttributes
}

interface ImageAttributes extends Document {
    _id: ObjectId
    url: string
    file: string
    name: string
    source: string
}

interface GroupAttributes extends Document {
    _id: ObjectId
    name: string
    sort: number
    words: objectId[] | Word[]
}

interface Image {
    _id: ObjectId
    url: string
    file: string
    source: string
}

interface Word {
    _id: ObjectId
    english: string
    target: string
    image: ObjectId | Image
}

interface Group {
    _id: ObjectId
    name: string
    sort: number
    words:  objectId[] | Word[]
}

