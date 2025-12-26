import { Dialect } from 'sequelize'

export type DrinkType =  'cocktail' | 'bowl' | 'neat'

interface FalseIdolDrink {
    id: number
    programId: number
    name: string
    price: string
    country: string
    notes: string | null
    current: boolean
    immortal: boolean
    requested: boolean
    requestedOn: Date | string | null
    approvedBy: string | null
}

interface Drink {
    drinkId: number
    type: DrinkType
    name: string
    country: string
    current: boolean
    price: number
    user: User
    onMenu?: boolean
    happyHour?: boolean
    image?: string
    sort?: number
    description?: string
}

interface UserInfo {
    userDrinkId: number
    drinkId: number
    userId: number
    notes: string
    ordered: number
}

interface User {
    userId: number
    name: string
    email: string
    verified: boolean
    isAdmin: boolean
}

interface Image {
    imageId: number
    name: string
    url: string
}

interface Setting {
    settingId: number
    name: string
    active: boolean
}