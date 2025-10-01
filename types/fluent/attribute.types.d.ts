import { Dialect } from 'sequelize'

type Type = 'adjective' | 'nount' | 'verb' | 'adverb'
type Language = 'spanish' | 'french' | 'italian'
type Gender = 'f' | 'm'
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

interface Word {
    wordId?: number
    groupId?: number
    categoryId?: number
    type: Type
    difficulty: Difficulty
    base: string
    sort: number
    translations?: Translation[]
    spanish?: Translation
    italian?: Translation
    french?: Translation
}

interface Translation {
    translationId?: string
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
    words?: Word[]
    categories?: CategoryAttributes[]
    wordsByLanguage: {
        french: string[]
        spanish: string[]
        italian: string[]
    }
}

interface CategoryAttributes {
    categoryId?: number
    groupId?: number
    name: string
    sort: number
    words?: Word[]
}

interface LessonAttributes {
    lessonId?: string
    section: number
    title: string
    language: Language
    sort: number
}
