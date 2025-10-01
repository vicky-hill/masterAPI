import { Dialect } from 'sequelize'

type Type = 'adjective' | 'nount' | 'verb' | 'adverb'
type Language = 'spanish' | 'french' | 'italian'
type Gender = 'f' | 'm'
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

interface Word {
    wordId: number
    groupId?: number
    categoryId?: number
    type: Type
    difficulty: Difficulty
    base: string
    sort: number
    translations: Translation[]
    spanish: Translation
    italian: Translation
    french: Translation
}

interface Translation {
    translationId: string
    language: Language
    gender: Gender
    word: number
    base: string
    masculineSingular: string
    masculinePlural: string
    feminineSingular: string
    femininePlural: string
}

interface Group {
    groupId: number
    name: string
    words: Word[]
    categories: Category[]
    wordsByLanguage: {
        french: string[]
        spanish: string[]
        italian: string[]
    }
}

interface Category {
    categoryId: number
    groupId?: number
    name: string
    sort: number
    words: Word[]
}

interface Lesson {
    lessonId: string
    section: number
    title: string
    language: Language
    sort: number
    phrases: Phrase[]
}

interface Phrase {
    phraseId: number
    lessonId: number
    text: string
    sort: number
}