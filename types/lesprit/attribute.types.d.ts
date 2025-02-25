import { Schema, model, Document, ObjectId, LeanDocument } from 'mongoose'

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
    language: string
    foreign: string
    native: string
    rating: number
    dueDate: Date
    createdAt: Date
    list: ObjectId | ListAttributes
    user: ObjectId | UserAttributes
}


interface List {
    _id: ObjectId
    title: string
    image: string
    public: boolean
    urlKey: string
    createdAt: Date
    user: ObjectId | UserAttributes
}

interface Tense {
    pre?: string
    conjugated: string
}

interface Phrase {
    verb: ObjectId | VerbAttributes
    user: ObjectId | UserAttributes
    phrase: string
    rating: number
    group: number
}

interface Verb {
    _id: ObjectId
    verb: string
    language: 'french' | 'spanish' | 'italian'
    tenses: {
        present: Tense[],
        pastTense: Tense[]
    }
    priority: number,
    phrases: Phrase[]
}

interface ListAttributes extends Document, List { }
interface ListDocument extends LeanDocument, List { }

interface VerbAttributes extends Document, Verb { }
interface VerbDocument extends LeanDocument, Verb { }

interface PhraseAttributes extends Document, Phrase { }
interface PhraseDocument extends LeanDocument, Phrase { }

