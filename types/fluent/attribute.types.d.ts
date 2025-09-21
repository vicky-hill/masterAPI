import { Dialect } from 'sequelize'

interface WordAttributes {
    wordId?: number
    groupId?: number
    categoryId?: number
    type: 'adjective' | 'noun' | 'verb' | 'adverb'
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    base: string
    sort: number
    translations?: Translation[]
}

interface Translation {
    translationId?: string
    language: '' | ''
    word: number
    base: string
    masculineSingular: string
    masculinePlural: string
    feminineSingular: string
    femininePlural: string
}

interface GroupAttributes {
    groupId?: number
    name: string
    words?: WordAttributes[]
    categories?: CategoryAttributes[]
}

interface CategoryAttributes {
    categoryId?: number
    groupId?: number
    name: string
    sort: number
    words?: WordAttributes[]
}
