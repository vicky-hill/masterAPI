import { Schema, model, Document, ObjectId } from 'mongoose'

/* ===================================
   Users
=================================== */
interface CreateUser {    
    firebaseId: string
    email: string    
    username?: string    
    fname?: string    
    lname?: string
}

interface UpdateUser {    
    firebaseId?: string
    email?: string    
    username?: string    
    fname?: string    
    lname?: string
}


/* ===================================
   Places
=================================== */

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

interface AddPlaceToUserList {
    placeId: ObjectId
    list: "been" | "wish" | "dislike"
}

interface RemovePlaceFromUserList {
    placeId: ObjectId
    list: "been" | "wish" | "dislike"
}

/* ===================================
   Categories
=================================== */

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

/* ===================================
   Neighborhoods
=================================== */

interface CreateNeighborhood {
    fsq_id: string
    neighborhood: string
}

interface UpdateNeighborhood {
    fsq_id: string
    neighborhood: string
}