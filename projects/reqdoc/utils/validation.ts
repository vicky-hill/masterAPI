import * as yup from 'yup'

const validateStrings = async (values: any, string: string) => {
    const fields: any = string.split(" ");
    const schemaObject: any = {};

    fields.forEach((field: any) => {
        const isOptional = field.startsWith('~');

        if (isOptional) {
            schemaObject[field.slice(1)] = yup.string()
        } else {
            schemaObject[field] = yup.string().required(`No ${field} was provided`)
        }
    })

    const schema = yup.object().shape(schemaObject);

    await schema.validate(values, { abortEarly: false });
}

const sort = async (values: any) => {
    const schema = yup.array().of(
        yup.object().shape({
            _id: yup.string().required(),
            sort: yup.string().required()
        })
    ).required('req.body is missing the products array')

    await schema.validate(values, { abortEarly: false });
}

const validate = {
    sort,
    createReq: async (values: any) => await validateStrings(values, "~title text feature"),
    updateReq: async (values: any) => await validateStrings(values, "~title ~text ~details"),
    createProject: async (values: any) => await validateStrings(values, "name team slug key"),
    updateProject: async (values: any) => await validateStrings(values, "~name ~slug"),
    createFeature: async (values: any) => await validateStrings(values, "name project"),
    updateFeature: async (values: any) => await validateStrings(values, "name"),
    createTeam: async (values: any) => await validateStrings(values, "user"),
    addComment: async (values: any) => await validateStrings(values, "user text"),
    editComment: async (values: any) => await validateStrings(values, "text"),
    createUser: async (values: any) => await validateStrings(values, "firebaseID email"),
    updateUser: async (values: any) => await validateStrings(values, "name"),
}

export default validate;