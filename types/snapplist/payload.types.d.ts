import { Schema, model, Document } from 'mongoose'

interface CreatePlace {
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
}

interface UpdatePlace {
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
}

interface CreateCategory {    
    id: string    
    name: string    
    short_name: string    
    plural_name: string    
    image: string
}

interface UpdateCategory {    
    id: string    
    name: string    
    short_name: string    
    plural_name: string    
    image: string
}

interface CreateNeighborhood {    
    fsq_id: string    
    neighborhood: string
}

interface UpdateNeighborhood {    
    fsq_id: string    
    neighborhood: string
}