import { Schema, model, Document, ObjectId } from 'mongoose'

interface PlaceAttributes extends Document {
    _id: ObjectId
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
    neighborhood: NeighborhoodAttributes
    categories: CategoryAttributes[]
    rating: number
    price?: number
    photos: [{
        fsq_id: string
        prefix: string
        suffix: string
        width: number
        height: number
    }]
    createdAt: Date
    updatedAt: Date
}

interface CategoryAttributes {
    _id: ObjectId
    fsq_id: string    
    name: string    
    short_name: string    
    plural_name: string    
    icon: {
        prefix: string
        suffix: string
    }
}

interface NeighborhoodAttributes {    
    _id: ObjectId
    name: string
    city: string
    places: [PlaceAttributes]
    fsq_ids: [string]
}