import { Schema, model, Document, ObjectId, LeanDocument } from 'mongoose'
import { Language } from './attribute.types'


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

interface CreatePhrase {
    lessonId: number
    phrases: string[]
}

interface CreateLesson {
    section: number
    title: string
    language: Language
    sort: number
}