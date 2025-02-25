import { Verb, VerbAttributes, VerbDocument } from '../../../types/lesprit/attribute.types'
import { CreateVerb, UpdateVerb } from '../../../types/lesprit/payload.types'
import VerbModel from './verbs.model'

export const getAdminVerbs = async () => {
    const verbInstances: VerbDocument[] = await VerbModel.find().lean();

    const verbs = verbInstances.map(verbInstance => ({
        ...verbInstance
    }))

    return verbs as Verb[];
}

export const getVerb = async (verbId: string): Promise<any> => {
    const verb: VerbDocument = await VerbModel.findById(verbId).lean();

    if (!verb) throw new Error('Verb not found');

    return verb as Verb;
}

export const createVerb = async (data: CreateVerb) => {
    const verbInstance: VerbAttributes = await VerbModel.create({ ...data });
    const verb = verbInstance.toObject();

    return verb as Verb;
}

export const updateVerb = async (data: UpdateVerb, verbId: string) => {
    const verb: VerbDocument = await VerbModel.findByIdAndUpdate(verbId, data, { new: true }).lean();

    if (!verb) throw new Error('Verb not found');

    return verb as Verb;
}

export const deleteVerb = async (verbId: string) => {
    const verb: VerbDocument = await VerbModel.findByIdAndDelete(verbId).lean();

    if (!verb) throw new Error('Verb not found');

    return verb as Verb;
}