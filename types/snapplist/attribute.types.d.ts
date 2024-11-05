import { Schema, model, Document } from 'mongoose'

interface PlaceAttributes extends Document {
    fsq_id: string
    name: string
    geo: {
        lat: number
        long: number
    }
    location: {
        address: string
        locality: string
        postcode: string
        region: string
        country: string
    }
    address: string
    createdAt: Date
    updatedAt: Date
}

