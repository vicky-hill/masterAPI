import { PlaceAttributes } from '../../../types/snapplist/attribute.types'
import { CreatePlace } from '../../../types/snapplist/payload.types'
import Place from './places.model'

export const createPlace = async (place: CreatePlace) => {
    try {
        const createdPlace: PlaceAttributes | null = await Place.create(place);

        return createdPlace;
    } catch (err) {
        throw err;
    }
}
